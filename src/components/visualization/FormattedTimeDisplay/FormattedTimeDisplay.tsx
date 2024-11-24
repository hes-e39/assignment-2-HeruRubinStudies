import type React from 'react';
import commonStyles from '../../../common-styles/common-styles.module.scss';

interface FormattedTimeDisplayProps {
    milliseconds: number;
    classes?: string;
    mode?: 'units';
    size?: 'small' | 'medium' | 'large';
    useSemicolon?: boolean;
}

const FormattedTimeDisplay: React.FC<FormattedTimeDisplayProps> = ({ milliseconds, classes, mode, useSemicolon, size }) => {
    const totalHundredths = Math.floor(milliseconds / 10);
    const hundredths = totalHundredths % 100;
    const seconds = Math.floor(totalHundredths / 100) % 60;
    const minutes = Math.floor(totalHundredths / 6000) % 60;
    const hours = Math.floor(totalHundredths / 360000);

    const semiColon = () => {
        if (useSemicolon) {
            return <span className={`${commonStyles.dataFont} ${commonStyles.fontBook}`}>:</span>;
        }
    };

    const time = () => {
        if (hours > 0) {
            return (
                <>
                    <span>{`${String(hours).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span>Hrs</span>}
                    {semiColon()}
                    <span>{`${String(minutes).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span>Hrs</span>}
                    {semiColon()}
                    <span>{`${String(seconds).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span>Sec</span>}
                    {semiColon()}
                    <span>{`${String(hundredths).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span>Ms</span>}
                </>
            );
        } else {
            return (
                <>
                    <span className={commonStyles.number} >{`${String(minutes).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span className={commonStyles.units}>Min</span>}
                    {semiColon()}
                    <span className={commonStyles.number}>{`${String(seconds).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span className={commonStyles.units}>Sec</span>}
                    {semiColon()}
                    <span className={commonStyles.number}>{`${String(hundredths).padStart(2, '0')}`}</span>
                    {mode === 'units' && <span className={commonStyles.units}>Ms</span>}
                </>
            );
        }
    };

    const getSize = () => {
        switch (size) {
            case 'small':
                return commonStyles.small;
            case 'medium':
                return commonStyles.medium;
            case 'large':
                return commonStyles.large;
        }
    };
    return <div className={`${commonStyles.timerDisplay} ${getSize()} ${commonStyles.fontBold} ${classes ?? ''}`}>{time()}</div>;
};

export default FormattedTimeDisplay;
