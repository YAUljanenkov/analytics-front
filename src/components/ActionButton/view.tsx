import React, { useRef } from 'react';
import styles from './styles.module.css';
import { proiconsCancel, mingcuteLoading } from '../../assets';
import classNames from 'classnames';
import { ActionButtonStatus } from '../../types';

interface ActionButtonProps {
    label?: string;
    status?: ActionButtonStatus;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAbort?: () => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: () => void;
    mode?: 'aggregate' | 'generate';
}

const getButtonTextByStatus = (
    status: ActionButtonStatus,
    label?: string
): React.ReactNode => {
    switch (status) {
        case ActionButtonStatus.Dragging:
        case ActionButtonStatus.Idle:
            return 'Загрузить файл';
        case ActionButtonStatus.Loaded:
            return label;
        case ActionButtonStatus.Generating:
        case ActionButtonStatus.Parsing:
            return (
                <img
                    src={mingcuteLoading}
                    className={styles.loadingIcon}
                    alt="loading"
                />
            );
        case ActionButtonStatus.Success:
            return label;
        case ActionButtonStatus.Generated:
            return 'Done!';
        case ActionButtonStatus.Error:
            return label;
        default:
            return '';
    }
};

const statusToLabel: Record<ActionButtonStatus, string> = {
    [ActionButtonStatus.Idle]: 'или перетащите сюда',
    [ActionButtonStatus.Dragging]: 'или перетащите сюда',
    [ActionButtonStatus.Loaded]: 'файл загружен!',
    [ActionButtonStatus.Parsing]: 'идёт парсинг файла',
    [ActionButtonStatus.Success]: 'готово!',
    [ActionButtonStatus.Error]: 'упс, не то...',
    [ActionButtonStatus.Generating]: 'идёт процесс генерации',
    [ActionButtonStatus.Generated]: 'файл сгенерирован!',
};

const statusToWrapperClass: Record<ActionButtonStatus, string> = {
    [ActionButtonStatus.Idle]: styles.wrapper__idle,
    [ActionButtonStatus.Dragging]: styles.wrapper__dragging,
    [ActionButtonStatus.Loaded]: styles.wrapper__parsing,
    [ActionButtonStatus.Parsing]: styles.wrapper__parsing,
    [ActionButtonStatus.Success]: styles.wrapper__parsing,
    [ActionButtonStatus.Error]: styles.wrapper__error,
    [ActionButtonStatus.Generating]: '',
    [ActionButtonStatus.Generated]: '',
};

const statusToButtonParams: Record<ActionButtonStatus, string> = {
    [ActionButtonStatus.Idle]: styles.button__idle,
    [ActionButtonStatus.Dragging]: styles.button__idle,
    [ActionButtonStatus.Loaded]: styles.button__active,
    [ActionButtonStatus.Parsing]: styles.button__active,
    [ActionButtonStatus.Success]: styles.button__success,
    [ActionButtonStatus.Error]: styles.button__error,
    [ActionButtonStatus.Generating]: styles.button__active,
    [ActionButtonStatus.Generated]: styles.button__success,
};

const ActionButton: React.FC<ActionButtonProps> = ({
    status = ActionButtonStatus.Idle,
    label,
    onChange,
    onAbort,
    onDrop,
    onDragLeave,
    onDragOver,
    mode = 'aggregate',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const isShowCancelButton =
        status === ActionButtonStatus.Loaded ||
        status === ActionButtonStatus.Success ||
        status === ActionButtonStatus.Generated ||
        status === ActionButtonStatus.Error;
    return (
        <div
            className={classNames(
                { [styles.wrapper]: mode === 'aggregate' },
                { [styles.generateWrapper]: mode === 'generate' },
                statusToWrapperClass[status]
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className={styles.buttonContainer}>
                <button
                    onClick={() => inputRef.current?.click()}
                    className={classNames(
                        styles.button,
                        statusToButtonParams[status]
                    )}
                >
                    {getButtonTextByStatus(status, label)}
                </button>
                <input
                    ref={inputRef}
                    onChange={onChange}
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    style={{ display: 'none' }}
                />
                {isShowCancelButton && (
                    <button className={styles.cancelButton} onClick={onAbort}>
                        <img src={proiconsCancel} alt="cancel" />
                    </button>
                )}
            </div>
            <span className={styles.label}>{statusToLabel[status]}</span>
        </div>
    );
};

export default ActionButton;
