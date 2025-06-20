import React from 'react';
import { logo, mageUpload, ouiGenerate, solarHistory } from '../../assets';
import styles from './styles.module.css';
import { MenuItem } from '../../ui';
import { Routes } from '../../types';
import { useLocation, useNavigate } from 'react-router';

const View: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleMenuItemClick = (route: string) => {
        navigate(route);
    };
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <img height={60} src={logo} alt="Logo" />
                <h1 className={styles.header__title}>
                    &nbsp;МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА&nbsp;
                </h1>
            </div>
            <div className={styles.menuWrapper}>
                <MenuItem
                    icon={mageUpload}
                    text="CSV Аналитик"
                    onClick={() => handleMenuItemClick(Routes.Analytics)}
                    active={location.pathname.includes(Routes.Analytics)}
                />
                <MenuItem
                    icon={ouiGenerate}
                    text="CSV Генератор"
                    onClick={() => handleMenuItemClick(Routes.Generate)}
                    active={location.pathname.includes(Routes.Generate)}
                />
                <MenuItem
                    icon={solarHistory}
                    text="История"
                    onClick={() => handleMenuItemClick(Routes.History)}
                    active={location.pathname.includes(Routes.History)}
                />
            </div>
        </header>
    );
};

export default View;
