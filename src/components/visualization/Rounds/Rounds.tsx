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

    const getRoundTicksSize=()=>{
        if(totalRounds < 6){return styles.large}
        if(totalRounds >= 6 && totalRounds < 30 ){return styles.medium}
        if(totalRounds >= 30 && totalRounds <= 60 ){return styles.small}
    }


    return (
        <div className={`${styles.roundsDisplay} ${getRoundTicksSize()}`}>
            {Array.from({ length: totalRounds }).map((_, index) => (
                <div
                    key={index}
                    className={`${styles.roundSquare} ${getRoundTicksSize()} ${
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
                                border: breakDuration && index % 2 !== 0 ? "1px dashed rgb(116 137 185 / 65%)" : "none",
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Rounds;
