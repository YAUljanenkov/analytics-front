import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

type MenuItemProps = {
    icon: string;
    text: string;
    onClick?: () => void;
    active?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick, active }) => (
    <div
        className={classNames(styles.menuItem, {
            [styles.menuItem__active]: active,
        })}
        onClick={onClick}
    >
        <img className={styles.menuItem__icon} src={icon} alt={text} />
        <span className={styles.menuItem__text}>{text}</span>
    </div>
);

export default MenuItem;
