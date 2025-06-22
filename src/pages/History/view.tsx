import React from 'react';
import { Header } from '../../components/Header';
import { usePersistStore } from '../../store';
import styles from './styles.module.css';
import { Button, ResultItem } from '../../ui';
import { useNavigate } from 'react-router';
import { Routes } from '../../types';

const View: React.FC = () => {
    const processed = usePersistStore((store) => store.processed);
    const clearProcessed = usePersistStore((store) => store.clearProcessed);
    const removeItem = usePersistStore((store) => store.removeItem);
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className={styles.container}>
                {processed.map((item) => (
                    <ResultItem
                        result={item}
                        onClick={() => {}}
                        onTrashClick={(item) => removeItem(item.id)}
                    />
                ))}
                <div className={styles.buttonsContainer}>
                    <Button
                        design="primary"
                        onClick={() => navigate(Routes.Analytics)}
                    >
                        Сгенерировать больше
                    </Button>
                    <Button design="secondary" onClick={clearProcessed}>
                        Очистить всё
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default View;
