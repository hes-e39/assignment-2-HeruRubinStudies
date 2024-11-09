import type React from "react";
import commonStyles from "../../common-styles/common-styles.module.scss"

interface FormattedTimeDisplayProps {
    milliseconds: number;
    classes? : string;
}

const FormattedTimeDisplay : React.FC<FormattedTimeDisplayProps> = ({milliseconds, classes })=>{
    const totalHundredths = Math.floor(milliseconds / 10);
    const hundredths = totalHundredths % 100;
    const seconds = Math.floor(totalHundredths / 100) % 60;
    const minutes = Math.floor(totalHundredths / 6000) % 60;
    const hours = Math.floor(totalHundredths / 360000);

    const semiColon= ()=> {
        return <span className={`${commonStyles.dataFont} ${commonStyles.fontBook}`}>:</span>
    }

    const time =()=>{
        if (hours > 0) {
            return (
                <>
                    <span>{`${String(hours).padStart(2, '0')}`}</span>
                    {semiColon()}
                    <span>{`${String(minutes).padStart(2, '0')}`}</span>
                    {semiColon()}
                    <span>{`${String(seconds).padStart(2, '0')}`}</span>
                    {semiColon()}
                    <span>{`${String(hundredths).padStart(2, '0')}`}</span>
                </>
            )
        } else {
            return (
                <>
                    <span>{`${String(minutes).padStart(2, '0')}`}</span>
                    {semiColon()}
                    <span>{`${String(seconds).padStart( 2,  '0' )}`}</span>
                    {semiColon()}
                    <span>{`${String(hundredths).padStart(2, '0')}`}</span>
                </>
            );
        }
    }

    return(
        <div className={`${commonStyles.timerDisplay} ${commonStyles.fontBold} ${classes ?? ""}`}>
            {time()}
        </div>
    )
}

export default FormattedTimeDisplay;