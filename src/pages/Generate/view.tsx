import React from 'react';
import { Header, ActionButton } from '../../components';
import { Button } from '../../ui';
import styles from './styles.module.css';
import { useStore, type Store } from '../../store';
import { ActionButtonStatus } from '../../types';
import { GenerateService } from '../../services';

const View: React.FC = () => {
    const status = useStore((state: Store) => state.generatingStatus);
    const setStatus = useStore((state: Store) => state.setGeneratingStatus);
    const label = status === ActionButtonStatus.Error ? 'Ошибка' : '';
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <span className={styles.title}>
                    Сгенерируйте готовый csv-файл нажатием одной кнопки
                </span>
                {status === ActionButtonStatus.Idle && (
                    <Button
                        onClick={() => GenerateService.generateFile(setStatus)}
                    >
                        Начать генерацию
                    </Button>
                )}
                {status !== ActionButtonStatus.Idle && (
                    <ActionButton
                        status={status}
                        mode="generate"
                        label={label}
                        onAbort={() => setStatus(ActionButtonStatus.Idle)}
                    />
                )}
            </div>
        </div>
    );
};

export default View;
