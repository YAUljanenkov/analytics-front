import React, { useState } from 'react';
import { Header, ButtonUpload } from '../../components';
import { Button, StatsItem } from '../../ui';
import styles from './styles.module.css';
import type { Stats } from 'src/types';
import { parseDayNumber } from '../../utils';
import { AggregateService } from '../../services/AggregateService';
import { useStore, type Store } from '../../store';
import { ButtonUploadStatus } from '../../types';

const View: React.FC = () => {
    const stats: Stats = useStore((state: Store) => state.stats);
    const status: ButtonUploadStatus = useStore((state: Store) => state.status);
    const setStats = useStore((state: Store) => state.setStats);
    const setStatus = useStore((state: Store) => state.setStatus);
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileName(file?.name);
        setFile(file ?? null);
        setStatus(ButtonUploadStatus.Loaded);
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        console.log('Files dropped:', event.dataTransfer.files);
        setFileName(file?.name);
        setFile(file ?? null);
        setStatus(ButtonUploadStatus.Loaded);
    };

    const handleFileSend = () => {
        if (file) {
            AggregateService.loadFile(file, setStats, setStatus);
        }
    };

    const handleAbort = () => {
        setStatus(ButtonUploadStatus.Idle);
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
            <ButtonUpload
                status={status}
                onChange={handleFileUpload}
                fileName={fileName}
                onAbort={handleAbort}
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setStatus(ButtonUploadStatus.Dragging);
                }}
                onDragLeave={() => setStatus(ButtonUploadStatus.Idle)}
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
