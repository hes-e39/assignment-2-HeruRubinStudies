import type React from 'react';
import styles from './numberdList.module.scss';

export type NumberedListItem = { numberLabel?: string; nameLabel: string };

export interface NumberedListProps {
    listItems: NumberedListItem[];
    generateNumberLabels?: boolean;
    classes?: string;
    itemClasses?: {
        numberLabel?: string;
        nameLabel?: string;
    };
    presets?: 'dark-on-light' | 'light-on-dark';
}

const NumberedList: React.FC<NumberedListProps> = ({ listItems, generateNumberLabels, presets }) => {
    const getPresets = () => {
        switch (presets) {
            case 'dark-on-light':
                return styles.darkOnLight;
            case 'light-on-dark':
                return styles.lightOnDark;
            default:
                return "";
        }
    };

    return (
        <ul>
            {listItems.map((item, index) => (
                <li key={item.numberLabel} className={`${styles.item} ${getPresets()}`}>
                    <span className={styles.number}>{generateNumberLabels ? index : item.numberLabel}</span>
                    <span className={styles.label}>{item.nameLabel}</span>
                </li>
            ))}
        </ul>
    );
};

export default NumberedList;
