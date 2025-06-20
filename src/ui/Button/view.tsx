import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    design?: 'primary' | 'secondary' | 'accent';
    disabled?: boolean;
}

const getDesignClass = (design: string, disabled: boolean) => {
    if (disabled) {
        return styles.button__disabled;
    }

    switch (design) {
        case 'primary':
            return styles.button__primary;
        case 'secondary':
            return styles.button__secondary;
        case 'accent':
            return styles.button__accent;
        default:
            return styles.button__primary;
    }
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    design = 'primary',
    disabled = false,
}) => {
    return (
        <button
            className={classNames(
                styles.button,
                getDesignClass(design, disabled ?? false)
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
