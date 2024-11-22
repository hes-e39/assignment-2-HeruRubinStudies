import type React from 'react';
import { useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import './Stopwatch.module.scss';
import styles from './Stopwatch.module.scss';
import Modal from "../../generic/Modal/Modal.tsx";
import TButton from "../../generic/Button/TButton.tsx";
import {formatTimerNumber} from "../../../utils/helpers.ts";
import NumberedList from "../../NumberedList/NumberedList.tsx";
import commonBtnStyles from "../../generic/Button/TButton.module.scss";
import listStyles from "../../NumberedList/numberdList.module.scss";

interface StopWatchProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes? : string;
}

const StopWatch: React.FC<StopWatchProps> = ({ milliseconds, isRunning, reset, pause, start, classes }) => {
    const [laps, setLaps] = useState<{numberLabel : string, nameLabel:string}[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Format the time for lap display
    const formatTime = (ms: number): string => {
        const hundredths = ms % 100;
        const seconds = Math.floor(ms / 100) % 60;
        const minutes = Math.floor(ms / (100 * 60)) % 60;
        const hours = Math.floor(ms / (100 * 60 * 60));

        return `${hours > 0 ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
    };

    // Add a new lap
    const addLap = () => {
        setLaps((prevLaps) => [{numberLabel : formatTimerNumber(laps.length + 1), nameLabel : `${formatTime(milliseconds)}` }, ...prevLaps]); // Add new lap to the beginning of the array
    };

    const clearLaps =()=>{
        setLaps([])
    }

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className={`${styles.stopwatchContainer}   ${classes ?? ""}`}>
            <FormattedTimeDisplay milliseconds={milliseconds} />
            <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                <div className={styles.lapsControlsArea}>
                    <TButton iconClasses={{fillClass : commonBtnStyles.filled, strokeClass : commonBtnStyles.strokedIcon}} classes={`${isRunning ? '' : styles.hidden} ${commonBtnStyles.config} ${commonBtnStyles.darkOnLight}`} btnType="small-rect" label="Lap" icon="plus" actionFunc={addLap} />

                </div>
            </TimerControls>
            {
                laps.length > 0 &&
                <div className={styles.lapsContainer}>
                    <ul className={styles.lapList}>
                         <NumberedList presets="light-on-dark" classes={styles.lapList} listItems={laps.slice(0, 3)}/>
                        {/* Render the 3 most recent laps */}
                        {
                            laps.length > 3 &&
                            <li className={`${listStyles.item} ${listStyles.lightOnDark}`}>
                                <span className={`${listStyles.label}`}>{laps.length - 3} more laps</span>
                            </li>
                        }
                    </ul>
                    {/* Show extra laps label if there are more than 3 laps */}
                    {
                        laps.length > 0 &&
                        <div className={styles.lapActionsArea}>
                            {laps.length > 3 && (
                                <div className={styles.extraLaps}>
                                    <TButton classes={commonBtnStyles.config} btnType="small-rect" label="View All"  actionFunc={toggleModal} />
                                </div>
                            )}
                            {
                                laps.length > 0 &&
                                <TButton classes={`${commonBtnStyles.config} ${listStyles.lightOnDark}`} iconClasses={{classes : commonBtnStyles.icon, strokeClass : commonBtnStyles.stroked}} btnType="small-rect" label="Clear" icon="close-x" actionFunc={clearLaps} />
                            }
                        </div>
                    }
                </div>
            }

            {/* Modal for Viewing All Laps */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} >
                        <h2>All Laps</h2>
                        <ul className={styles.allLapsList}>
                             <NumberedList listItems={laps}/>
                        </ul>
                </Modal>
            )}
        </div>
    );
};

export default StopWatch;
