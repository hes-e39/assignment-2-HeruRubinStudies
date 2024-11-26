import type React from "react";
import {useState} from "react";
import useTimer from "../../hooks/useTimer.tsx";
import Stopwatch from "../../components/timers/Stopwatch/Stopwatch.tsx";
import Countdown from "../../components/timers/Countdown/Countdown.tsx";
import XY from "../../components/timers/XY/XY.tsx";
import Tabata from "../../components/timers/Tabata/Tabata.tsx";
import TabMenu, {type MenuItem} from "../../components/menus/TabMenu/TabMenu.tsx";
import styles from "./TimersView.module.scss";
import commonStyles from "../../common-styles/common-styles.module.scss"
import mainStyles from "../../main.module.scss";


export type timerType = "xy" | "stopwatch" | "countdown" | "tabata";

const Timer: React.FC = () => {
    const tabMenuItems : MenuItem[] = [
        {
            label: 'Stopwatch',
            iconName: 'stopwatch',
            onClick: () => {
                reset()
                setActiveTimer("stopwatch")
            },
        },
        {
            label: 'Countdown',
            iconName: 'countdown',
            onClick: () => {
                reset()
                setActiveTimer("countdown")
            },
        },
        {
            label: 'XY',
            iconName: 'xy',
            onClick: () => {
                reset()
                setActiveTimer("xy")
            },
        },
        {
            label: 'Tabata',
            iconName: 'tabata',
            onClick: () =>{
                reset()
                setActiveTimer("tabata")
            },
        },
    ];
    const { milliseconds, isRunning, start, pause, reset } = useTimer();
    const [activeTimer, setActiveTimer] = useState<timerType>("stopwatch");

    return (
        <div className={`${mainStyles.mainContainer} ${commonStyles.flexVertCenter} ${commonStyles.flexVert} ${commonStyles.flexHorzCenter}`}>
            <div className={mainStyles.timerArea}>
                {activeTimer === "stopwatch" && (
                    <Stopwatch milliseconds={milliseconds} isRunning={isRunning}  start={start} pause={pause} reset={reset}  />
                )}
                {activeTimer === "countdown" && (
                    <Countdown milliseconds={milliseconds} initialTime={6000} isRunning={isRunning}  start={start} pause={pause} reset={reset} />
                )}
                {activeTimer === "xy" && (
                    <XY milliseconds={milliseconds} isRunning={isRunning} start={start} pause={pause} reset={reset} />
                )}
                {activeTimer === "tabata" && (
                    <Tabata milliseconds={milliseconds} isRunning={isRunning}  start={start} pause={pause} reset={reset}  />
                )}
            </div>
            <TabMenu classes={styles.tabMenuMain} items={tabMenuItems}  />
        </div>
    );
};

export default Timer;
