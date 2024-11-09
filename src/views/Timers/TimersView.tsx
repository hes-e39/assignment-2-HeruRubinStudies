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


type timerType = "XY" | "Stopwatch" | "Countdown" | "Tabata";

const Timer: React.FC = () => {
    const tabMenuItems : MenuItem[] = [
        {
            label: 'Stopwatch',
            iconName: 'stopwatch',
            onClick: () => {
                reset()
                setActiveTimer("Stopwatch")
            },
        },
        {
            label: 'Countdown',
            iconName: 'countdown',
            onClick: () => {
                reset()
                setActiveTimer("Countdown")
            },
        },
        {
            label: 'XY',
            iconName: 'xy',
            onClick: () => {
                reset()
                setActiveTimer("XY")
            },
        },
        {
            label: 'Tabata',
            iconName: 'tabata',
            onClick: () =>{
                reset()
                setActiveTimer("Tabata")
            },
        },
    ];
    const { milliseconds, isRunning, start, pause, reset } = useTimer();
    const [activeTimer, setActiveTimer] = useState<timerType>("Stopwatch");

    return (
        <div className={`${mainStyles.mainContainer} ${commonStyles.flexVertCenter} ${commonStyles.flexVert} ${commonStyles.flexHorzCenter}`}>
            <div>
                {activeTimer === "Stopwatch" && (
                    <Stopwatch milliseconds={milliseconds} isRunning={isRunning}  start={start} pause={pause} reset={reset}  />
                )}
                {activeTimer === "Countdown" && (
                    <Countdown milliseconds={milliseconds} initialTime={6000} isRunning={isRunning}  start={start} pause={pause} reset={reset} />
                )}
                {activeTimer === "XY" && (
                    <XY milliseconds={milliseconds} isRunning={isRunning} start={start} pause={pause} reset={reset} />
                )}
                {activeTimer === "Tabata" && (
                    <Tabata milliseconds={milliseconds} isRunning={isRunning}  start={start} pause={pause} reset={reset}  />
                )}
            </div>
            <TabMenu classes={styles.tabMenuMain} items={tabMenuItems}  />
        </div>
    );
};

export default Timer;
