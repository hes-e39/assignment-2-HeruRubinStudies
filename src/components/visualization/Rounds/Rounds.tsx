import Icon from "../../Icons/Icon";
import commonIconStyles from "../../Icons/commonIcons.module.scss";
import type React from "react";
import styles from "../visualizations.module.scss";

export interface RoundsProps {
    totalRounds: number;
    completedRounds: number[];
    roundsLeft: number;
    remainingTime: number;
    workDuration: number;
    breakDuration?: number; // Optional break duration prop
}

const Rounds: React.FC<RoundsProps> = ({
                                           totalRounds,
                                           completedRounds,
                                           workDuration,
                                           breakDuration,
                                           roundsLeft,
                                           remainingTime,
                                       }) => {
    return (
        <div className={styles.roundsDisplay}>
            {Array.from({ length: totalRounds }).map((_, index) => (
                <div
                    key={index}
                    className={`${styles.roundSquare} ${
                        completedRounds.includes(index) ? styles.completedRound : ""
                    }`}
                >
                    {completedRounds.includes(index) ? (
                        <Icon
                            iconName="checkmark"
                            classes={`${styles.iconContainer} ${commonIconStyles.selectedIcon} ${commonIconStyles.strokedHeavy}`}
                        />
                    ) : (
                        <div
                            className={styles.roundIndicator}
                            style={{
                                height:
                                    index === totalRounds - roundsLeft
                                        ? `${(remainingTime / workDuration) * 100}%`
                                        : "100%",
                                backgroundColor: breakDuration && index % 2 !== 0 ? "#606060" : "#ddd",
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Rounds;
