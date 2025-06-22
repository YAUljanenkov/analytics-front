import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    design?: 'primary' | 'secondary' | 'accent' | 'light';
    disabled?: boolean;
    squared?: boolean;
    size?: 'm' | 'l';
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
        case 'light':
            return styles.button__light;
        default:
            return styles.button__primary;
    }
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    design = 'primary',
    disabled = false,
    squared = false,
    size = 'm',
}) => {
    return (
        <button
            className={classNames(
                squared ? styles.buttonSquared : styles.button,
                getDesignClass(design, disabled ?? false),
                squared
                    ? styles[`size__${size}__squared`]
                    : styles[`size__${size}`]
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
