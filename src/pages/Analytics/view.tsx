import React, { useState } from 'react';
import { Header, ActionButton } from '../../components';
import { Button, StatsItem } from '../../ui';
import styles from './styles.module.css';
import { getCurrentDate, parseDayNumber } from '../../utils';
import { AggregateService } from '../../services';
import { useStore, usePersistStore } from '../../store';
import { ActionButtonStatus } from '../../types';

const View: React.FC = () => {
    const stats = useStore((state) => state.stats);
    const status: ActionButtonStatus = useStore((state) => state.status);
    const setStats = useStore((state) => state.setStats);
    const setStatus = useStore((state) => state.setStatus);
    const setProcessed = usePersistStore((state) => state.setProcessed);
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileName(file?.name);
        setFile(file ?? null);
        setStatus(ActionButtonStatus.Loaded);
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        console.log('Files dropped:', event.dataTransfer.files);
        setFileName(file?.name);
        setFile(file ?? null);
        setStatus(ActionButtonStatus.Loaded);
    };

    const handleFileSend = () => {
        if (file) {
            AggregateService.loadFile(
                file,
                setStats,
                setStatus,
                (item) => {
                    console.log('called');
                    setProcessed({
                        filename: file.name,
                        date: getCurrentDate(),
                        success: true,
                        data: item,
                    });
                },
                () => {
                    setProcessed({
                        filename: file.name,
                        date: getCurrentDate(),
                        success: false,
                    });
                }
            );
        }
    };

    const handleAbort = () => {
        setStatus(ActionButtonStatus.Idle);
        setFileName(undefined);
        setFile(null);
        setStats(null);
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <h2 className={styles.title}>
                Загрузите <b>csv</b> файл и получите <b>полную информацию</b>{' '}
                о нём за сверхнизкое время
            </h2>
            <ActionButton
                status={status}
                onChange={handleFileUpload}
                label={fileName}
                onAbort={handleAbort}
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setStatus(ActionButtonStatus.Dragging);
                }}
                onDragLeave={() => setStatus(ActionButtonStatus.Idle)}
            />
            <Button onClick={handleFileSend}>Отправить</Button>
            {stats && (
                <div className={styles.analytics}>
                    <div className={styles.analytics__column}>
                        <StatsItem
                            value={stats.total_spend_galactic}
                            label="общие расходы в галактических кредитах"
                        />
                        <StatsItem
                            value={stats.rows_affected}
                            label="количество обработанных записей"
                        />
                        <StatsItem
                            value={parseDayNumber(stats.less_spent_at)}
                            label="день года с минимальными расходами"
                        />
                        <StatsItem
                            value={stats.big_spent_civ}
                            label="цивилизация с максимальными расходами"
                        />
                    </div>
                    <div className={styles.analytics__column}>
                        <StatsItem
                            value={stats.less_spent_civ}
                            label="цивилизация с минимальными расходами"
                        />
                        <StatsItem
                            value={parseDayNumber(stats.big_spent_at)}
                            label="день года с максимальными расходами"
                        />
                        <StatsItem
                            value={stats.big_spent_value}
                            label="максимальная сумма расходов за день "
                        />
                        <StatsItem
                            value={stats.average_spend_galactic}
                            label="средние расходы в галактических кредитах"
                        />
                    </div>
                </div>
            )}
            {!stats && (
                <div className={styles.placeholder}>
                    <span className={styles.placeholder__text}>
                        Здесь
                        <br />
                        появятся хайлайты
                    </span>
                </div>
            )}
        </div>
    );
};

export default View;
