import React, { useRef } from 'react';
import styles from './styles.module.css';
import { proiconsCancel, mingcuteLoading } from '../../assets';
import classNames from 'classnames';
import { ButtonUploadStatus } from '../../types';

interface ButtonUploadProps {
    fileName?: string;
    status?: ButtonUploadStatus;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAbort?: () => void;
}

const getButtonTextByStatus = (
    status: ButtonUploadStatus,
    filename?: string
): React.ReactNode => {
    switch (status) {
        case ButtonUploadStatus.Dragging:
        case ButtonUploadStatus.Idle:
            return 'Загрузить файл';
        case ButtonUploadStatus.Loaded:
            return filename;
        case ButtonUploadStatus.Parsing:
            return (
                <img
                    src={mingcuteLoading}
                    className={styles.loadingIcon}
                    alt="loading"
                />
            );
        case ButtonUploadStatus.Success:
            return filename;
        case ButtonUploadStatus.Error:
            return filename;
        default:
            return '';
    }
};

const statusToLabel: Record<ButtonUploadStatus, string> = {
    [ButtonUploadStatus.Idle]: 'или перетащите сюда',
    [ButtonUploadStatus.Dragging]: 'или перетащите сюда',
    [ButtonUploadStatus.Loaded]: 'файл загружен!',
    [ButtonUploadStatus.Parsing]: 'идёт парсинг файла',
    [ButtonUploadStatus.Success]: 'готово!',
    [ButtonUploadStatus.Error]: 'упс, не то...',
};

const statusToWrapperClass: Record<ButtonUploadStatus, string> = {
    [ButtonUploadStatus.Idle]: styles.wrapper__idle,
    [ButtonUploadStatus.Dragging]: styles.wrapper__dragging,
    [ButtonUploadStatus.Loaded]: styles.wrapper__parsing,
    [ButtonUploadStatus.Parsing]: styles.wrapper__parsing,
    [ButtonUploadStatus.Success]: styles.wrapper__parsing,
    [ButtonUploadStatus.Error]: styles.wrapper__error,
};

const statusToButtonParams: Record<ButtonUploadStatus, string> = {
    [ButtonUploadStatus.Idle]: styles.button__idle,
    [ButtonUploadStatus.Dragging]: styles.button__idle,
    [ButtonUploadStatus.Loaded]: styles.button__active,
    [ButtonUploadStatus.Parsing]: styles.button__active,
    [ButtonUploadStatus.Success]: styles.button__success,
    [ButtonUploadStatus.Error]: styles.button__error,
};

const ButtonUpload: React.FC<ButtonUploadProps> = ({
    status = ButtonUploadStatus.Idle,
    fileName,
    onChange,
    onAbort,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const isShowCancelButton =
        status === ButtonUploadStatus.Loaded ||
        status === ButtonUploadStatus.Success ||
        status === ButtonUploadStatus.Error;
    return (
        <div
            className={classNames(styles.wrapper, statusToWrapperClass[status])}
        >
            <div className={styles.buttonContainer}>
                <button
                    onClick={() => inputRef.current?.click()}
                    className={classNames(
                        styles.button,
                        statusToButtonParams[status]
                    )}
                >
                    {getButtonTextByStatus(status, fileName)}
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

export default ButtonUpload;
