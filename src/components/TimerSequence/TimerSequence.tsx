import type React from "react";
import { useState, useEffect, useCallback } from "react";
import useTimer from "../../hooks/useTimer.tsx";
import Countdown from "../timers/Countdown/Countdown.tsx";
import Tabata from "../timers/Tabata/Tabata.tsx";
import mainStyles from "../../main.module.scss";
import commonStyles from "../../common-styles/common-styles.module.scss";
import seqStyles from "./TimerSequence.module.scss";
import TimerTracker from "../TimerTracker/TimerTracker.tsx";
import type {timerSequenceItem} from "../TimerTracker/TimerTracker.tsx";
import TButton from "../generic/Button/TButton.tsx";

const TimerSequence: React.FC = () => {
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [isSequenceRunning, setIsSequenceRunning] = useState(false);

    const { milliseconds, isRunning, start, pause, reset } = useTimer();

    const timerSequence: timerSequenceItem[]  = [
        { type: "Countdown", label : "Warm up", initialTime: 10000 },
        { type: "Tabata", label : "stretch", rounds: 3, workDuration: 4000, breakDuration: 2000 },
        { type: "Countdown", label : "push ups", initialTime: 5000 },
    ];

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
    }, [currentTimerIndex, reset, start, pause]);

    // Function to select a timer based on the tracker click
    const selectTimer = (index: number) => {
        setCurrentTimerIndex(index);
        reset();
        setIsSequenceRunning(true);
        start();
    };

    useEffect(() => {
        const isCountdownComplete =
            currentTimerConfig.type === "Countdown" &&
            milliseconds >= (currentTimerConfig.initialTime ?? 0);

        const isTabataComplete =
            currentTimerConfig.type === "Tabata" &&
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
                    {currentTimerConfig.type === "Countdown" && (
                        <Countdown
                            initialTime={currentTimerConfig.initialTime ?? 0}
                            milliseconds={milliseconds}
                            isRunning={isRunning}
                            reset={reset}
                            pause={pause}
                            start={start}
                        />
                    )}
                    {currentTimerConfig.type === "Tabata" && (
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
            <TButton classes={seqStyles.skip} btnType="small-rect" label={isSequenceRunning ? "Skip" : "Start Sequence"} actionFunc={isSequenceRunning ? skipToNextTimer : startSequence} />

            <TimerTracker
                timerSequence={timerSequence}
                currentTimerIndex={currentTimerIndex}
                onTimerSelect={selectTimer}
            />
        </div>
    );
};

export default TimerSequence;
