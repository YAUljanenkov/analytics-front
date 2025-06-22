import React, { useState } from 'react';
import { Header, ResultItem, Modal } from '../../components';
import { usePersistStore } from '../../store';
import styles from './styles.module.css';
import { Button } from '../../ui';
import { useNavigate } from 'react-router';
import { type ProcessedItem, Routes } from '../../types';

const View: React.FC = () => {
    const processed = usePersistStore((store) => store.processed);
    const clearProcessed = usePersistStore((store) => store.clearProcessed);
    const removeItem = usePersistStore((store) => store.removeItem);
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState<ProcessedItem | null>(null);
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className={styles.container}>
                {processed.map((item) => (
                    <ResultItem
                        result={item}
                        onClick={() => {
                            if (item.success) {
                                setItem(item);
                                setIsOpen(true);
                            }
                        }}
                        onTrashClick={() => removeItem(item.id)}
                        key={item.id}
                    />
                ))}
                <div className={styles.buttonsContainer}>
                    <Button
                        design="primary"
                        onClick={() => navigate(Routes.Generate)}
                    >
                        Сгенерировать больше
                    </Button>
                    <Button design="secondary" onClick={clearProcessed}>
                        Очистить всё
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                item={item}
            />
        </div>
    );
};

export default View;
