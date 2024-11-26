import React from 'react';
import { useState } from 'react';
import Icon from "../../Icons/Icon.tsx";
import styles from './NavMenu.module.scss';
import Logotype from "../../Graphics/Branding/Logotype/Logotype.tsx";

export interface MenuProps {
    children?: React.ReactNode;
    actionFunc?: () => void;
}

const NavigationMenu: React.FC<MenuProps> = ({ children, actionFunc }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        if (actionFunc) {
            actionFunc();
        }
    };

    return (
        <>
            <div className={styles.navigationContainer}>
                <div className={styles.logoArea}>
                    {!isOpen ? (
                        <button className={styles.menuButton} onClick={toggleMenu}>
                            <Icon iconName="menu" classes={styles.iconContainer} />
                        </button>
                    ) : (
                        <button className={styles.menuButton} onClick={toggleMenu}>
                            <Icon iconName="close-x" classes={`${styles.iconContainer} ${styles.closeIcon}`} strokedClasses={styles.stroked} />
                        </button>
                    )}
                    <div className={styles.logoType}>
                        <Logotype />
                    </div>
                </div>

                {/* Pass down `closeMenu` to the child components using `cloneElement` */}
                <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                    {React.isValidElement(children) &&
                        React.cloneElement(children as React.ReactElement, { closeMenu })}
                </div>
            </div>
            <div className={`${styles.menuBG} ${isOpen ? styles.open : ''}`} />
        </>
    );
};

export default NavigationMenu;
