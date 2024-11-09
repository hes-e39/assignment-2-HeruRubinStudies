import type React from 'react';
import { useState } from 'react';
import Icon, { type iconGraphic } from '../../Icons/Icon.tsx';
import styles from './TabMenu.module.scss';
import commonStyles from '../../Icons/commonIcons.module.scss';

export interface MenuItem {
    label: string;
    iconName: iconGraphic; // This will be passed to an Icon component later
    onClick: () => void; // Function to control content visibility or other logic externally
}

interface TabMenuProps {
    items: MenuItem[];
    classes?: string;
}

const TabMenu: React.FC<TabMenuProps> = ({ items, classes }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleItemClick = (index: number, onClick: () => void) => {
        setSelectedIndex(index); // Update internal selected index state
        onClick(); // Execute the item's external onClick function
    };

    return (
        <div className={`${styles.tabMenuContainer} ${classes}`}>
            {items.map((item, index) => (
                <div
                    style={{
                        width: `${(100 / items.length).toString()}%`,
                    }}
                    key={index}
                    className={`${styles.tabItem} ${selectedIndex === index ? styles.active : ''}`}
                    onClick={() => handleItemClick(index, item.onClick)}
                >
                    <Icon iconName={item.iconName} classes={`${styles.iconContainer} ${selectedIndex === index ? commonStyles.selectedIcon : ''}`} />
                    <span className={styles.tabLabel}>{item.label}</span>
                    <div className={styles.indicator} />
                </div>
            ))}
        </div>
    );
};

export default TabMenu;
