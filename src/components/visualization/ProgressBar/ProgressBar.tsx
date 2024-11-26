import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
    progressPercentage: number;
}

const ProgressBar = ({progressPercentage}: ProgressBarProps) => {
    return (
        <div className={styles.countDownArea}>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{width: `${progressPercentage}%`}}
                />
            </div>
        </div>
    )
}

export default ProgressBar;