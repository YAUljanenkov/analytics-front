import React from 'react';
import styles from './styles.module.css';
import type { ProcessedItem } from 'src/types';
import { smile, smileSad, trash } from '../../assets';
import classNames from 'classnames';
import { Button } from '../Button';

interface ResultItemProps {
    result: ProcessedItem;
    onClick: (item: ProcessedItem) => void;
    onTrashClick: (item: ProcessedItem) => void;
}

const ResultItem: React.FC<ResultItemProps> = ({
    result,
    onClick,
    onTrashClick,
}) => (
    <div className={styles.wrapper}>
        <div className={styles.container} onClick={() => onClick(result)}>
            <span>{result.filename}</span>
            <span>{result.date}</span>
            <div
                className={classNames(
                    { [styles.defaultText]: result.success },
                    { [styles.greyText]: !result.success }
                )}
            >
                Обработан успешно <img src={smile} alt="smile" />
            </div>
            <div
                className={classNames(
                    { [styles.defaultText]: !result.success },
                    { [styles.greyText]: result.success }
                )}
            >
                Не удалось обработать{' '}
                <img style={{ color: 'grey' }} src={smileSad} alt="smile" />
            </div>
        </div>
        <Button
            squared
            design="light"
            size="l"
            onClick={() => onTrashClick(result)}
        >
            <img src={trash} alt="delete" />
        </Button>
    </div>
);

export default ResultItem;
