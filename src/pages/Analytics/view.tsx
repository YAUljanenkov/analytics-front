import React from 'react';
import { Header, ButtonUpload, ButtonUploadStatus } from '../../components';
import { Button, StatsItem } from '../../ui';
import styles from './styles.module.css';
import type { Stats } from 'src/types';
import { parseDayNumber } from '../../utils';

const stats: Stats | null = null; //{
//     total_spend_galactic: 151201216.35272926,
//     rows_affected: 303100,
//     less_spent_at: 181,
//     big_spent_at: 43,
//     less_spent_value: 228109.82492818148,
//     big_spent_value: 588638.5993788167,
//     average_spend_galactic: 498.8492786299217,
//     big_spent_civ: 'blobs',
//     less_spent_civ: 'humans',
//     invalid_rows: 0,
// };

const View: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <h2 className={styles.title}>
                Загрузите <b>csv</b> файл и получите <b>полную информацию</b>{' '}
                о нём за сверхнизкое время
            </h2>
            <ButtonUpload
                status={ButtonUploadStatus.Idle}
                onClick={() => console.log('Upload clicked')}
                onAbort={() => console.log('Upload aborted')}
            />
            <Button>Отправить</Button>
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
                            label="количество обработанных записей"
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
