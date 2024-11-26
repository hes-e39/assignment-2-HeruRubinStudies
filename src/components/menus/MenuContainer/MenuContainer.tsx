import type React from 'react';
import type { ReactNode } from 'react';
import styles from '../../timers/Stopwatch/Stopwatch.module.scss';

interface MenuContainerProps {
    children: ReactNode;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ children }) => {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.bg} />
            <div className={styles.goalReadout}>{children}</div>
        </div>
    );
};
export default MenuContainer;
