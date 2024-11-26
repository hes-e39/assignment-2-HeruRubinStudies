import type React from 'react';
import TButton from '../../Button/TButton.tsx';
import styles from './Modal.module.scss';

export interface ModalProps {
    children: React.ReactNode;
    hasCloseBtn?: boolean;
    closeFunc?: () => void;
    title?: string;
    classes?: string;
}

const Modal: React.FC<ModalProps> = ({ children, hasCloseBtn, closeFunc, title, classes }) => {
    return (
        <div className={`${styles.modalOverlay} ${classes ?? ''}`}>
            <div className={styles.modalMenuItems}>
                {hasCloseBtn && <TButton actionFunc={closeFunc} classes={styles.closeBtn} iconClasses={{ strokeClass: styles.iconStroke }} btnType="round-small" icon="close-x"  />}
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <div className={styles.titleBar}>
                            {title && <h2>{title}</h2>}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
