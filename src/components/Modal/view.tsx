import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import React from 'react';
import type { ProcessedItem } from '../../types';
import { Button, StatsItem } from '../../ui';
import { parseDayNumber } from '../../utils';
import { proiconsCancel } from '../../assets';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ProcessedItem | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <div className={styles.closeButton}>
                    <Button design="secondary" squared onClick={onClose}>
                        <img src={proiconsCancel} alt="close" />
                    </Button>
                </div>
                {item && item.data && (
                    <>
                        <StatsItem
                            value={item.data.total_spend_galactic}
                            design="pink"
                            label="общие расходы в галактических кредитах"
                        />
                        <StatsItem
                            value={item.data.rows_affected}
                            design="pink"
                            label="количество обработанных записей"
                        />
                        <StatsItem
                            value={parseDayNumber(item.data.less_spent_at)}
                            design="pink"
                            label="день года с минимальными расходами"
                        />
                        <StatsItem
                            value={item.data.big_spent_civ}
                            design="pink"
                            label="цивилизация с максимальными расходами"
                        />
                        <StatsItem
                            value={item.data.less_spent_civ}
                            design="pink"
                            label="цивилизация с минимальными расходами"
                        />
                        <StatsItem
                            value={parseDayNumber(item.data.big_spent_at)}
                            design="pink"
                            label="день года с максимальными расходами"
                        />
                        <StatsItem
                            value={item.data.big_spent_value}
                            design="pink"
                            label="максимальная сумма расходов за день "
                        />
                        <StatsItem
                            value={item.data.average_spend_galactic}
                            design="pink"
                            label="средние расходы в галактических кредитах"
                        />
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
