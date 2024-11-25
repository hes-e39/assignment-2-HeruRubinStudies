import type React from "react";
import { useState, useEffect, useCallback } from "react";
import useTimer from "../../hooks/useTimer.tsx";
import Countdown from "../timers/Countdown/Countdown.tsx";
import Tabata from "../timers/Tabata/Tabata.tsx";
import mainStyles from "../../main.module.scss";
import commonStyles from "../../common-styles/common-styles.module.scss";
import seqStyles from "./TimerSequence.module.scss";
import TimerTracker from "../TimerTracker/TimerTracker.tsx";
import type { timerSequenceItem } from "../TimerTracker/TimerTracker.tsx";
import TButton from "../generic/Button/TButton.tsx";

const TimerSequence: React.FC = () => {
    const [timerSequence, setTimerSequence] = useState<timerSequenceItem[]>([
        { type: "countdown", icon: "countdown", label: "Warm up", initialTime: 10000 },
        { type: "tabata", icon: "tabata", label: "Stretch", rounds: 3, workDuration: 4000, breakDuration: 2000 },
        { type: "countdown", icon: "countdown", label: "Push ups", initialTime: 5000 },
    ]);

    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [isSequenceRunning, setIsSequenceRunning] = useState(false);

    const { milliseconds, isRunning, start, pause, reset } = useTimer();
    const currentTimerConfig = timerSequence[currentTimerIndex];

    const startSequence = () => {
        reset();
        setCurrentTimerIndex(0);
        setIsSequenceRunning(true);
        start();
    };

    const skipToNextTimer = useCallback(() => {
        if (currentTimerIndex < timerSequence.length - 1) {
            setCurrentTimerIndex((prevIndex) => prevIndex + 1);
            reset();
            start();
        } else {
            setIsSequenceRunning(false);
            pause();
        }
    }, [currentTimerIndex, timerSequence.length, reset, start, pause]);

    const selectTimer = (index: number) => {
        setCurrentTimerIndex(index);
        reset();
        setIsSequenceRunning(true);
        start();
    };

    const deleteTimer = (index: number) => {
        setTimerSequence((prevSequence) => prevSequence.filter((_, i) => i !== index));
        // Adjust the currentTimerIndex if necessary
        if (index <= currentTimerIndex && currentTimerIndex > 0) {
            setCurrentTimerIndex((prevIndex) => prevIndex - 1);
        }
    };

    useEffect(() => {
        const isCountdownComplete =
            currentTimerConfig?.type === "countdown" &&
            milliseconds >= (currentTimerConfig.initialTime ?? 0);

        const isTabataComplete =
            currentTimerConfig?.type === "tabata" &&
            (currentTimerConfig.rounds ?? 0) <= 0;

        if (isCountdownComplete || isTabataComplete) {
            skipToNextTimer();
        }
    }, [milliseconds, currentTimerConfig, skipToNextTimer]);

    return (
        <div
            className={`${mainStyles.mainContainer} ${commonStyles.flexVertCenter} ${commonStyles.flexVert} ${commonStyles.flexHorzCenter}`}
        >
            {isSequenceRunning && (
                <>
                    {currentTimerConfig?.type === "countdown" && (
                        <Countdown
                            initialTime={currentTimerConfig.initialTime ?? 0}
                            milliseconds={milliseconds}
                            isRunning={isRunning}
                            reset={reset}
                            pause={pause}
                            start={start}
                        />
                    )}
                    {currentTimerConfig?.type === "tabata" && (
                        <Tabata
                            totalRoundsExternal={currentTimerConfig.rounds}
                            workDurationExternal={currentTimerConfig.workDuration}
                            breakDurationExternal={currentTimerConfig.breakDuration}
                            milliseconds={milliseconds}
                            isRunning={isRunning}
                            reset={reset}
                            pause={pause}
                            start={start}
                        />
                    )}
                </>
            )}
            <TButton
                classes={isSequenceRunning ? seqStyles.skip : ""}
                btnType="small-rect"
                label={isSequenceRunning ? "Skip" : "Start Sequence"}
                actionFunc={isSequenceRunning ? skipToNextTimer : startSequence}
            />

            <TimerTracker
                timerSequence={timerSequence}
                currentTimerIndex={currentTimerIndex}
                onTimerSelect={selectTimer}
                onDelete={deleteTimer} // Pass the delete function
            />
        </div>
    );
};

export default TimerSequence;
