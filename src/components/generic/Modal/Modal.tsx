import type React from 'react';
import styles from './Modal.module.scss';
import commonStyles from '../../../main.module.scss';
import TButton from '../Button/TButton.tsx';

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
            <div className={styles.modalContent}>
                <div className={styles.titleBar}>
                    {hasCloseBtn && <TButton classes={commonStyles.spacer} btnType="round-small" icon="close-x" />}
                    {title && <h2>{title}</h2>}
                    {hasCloseBtn && <TButton actionFunc={closeFunc} btnType="round-small" icon="close-x" hoverAni="grow" />}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
