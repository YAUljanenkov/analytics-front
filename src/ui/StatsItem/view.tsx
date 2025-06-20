import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

interface StatsItemProps {
    value: string | number;
    label: string;
    design?: 'white' | 'pink';
}

const StatsItem: React.FC<StatsItemProps> = ({
    value,
    label,
    design = 'white',
}) => (
    <div
        className={classNames(styles.container, styles[`container__${design}`])}
    >
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
    </div>
);

export default StatsItem;
