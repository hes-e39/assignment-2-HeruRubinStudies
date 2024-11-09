import type React from 'react';
import { useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import './Stopwatch.module.scss';
import styles from './Stopwatch.module.scss';
import Modal from "../../generic/Modal/Modal.tsx";
import TButton from "../../generic/Button/TButton.tsx";

interface StopWatchProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes? : string;
}

const StopWatch: React.FC<StopWatchProps> = ({ milliseconds, isRunning, reset, pause, start, classes }) => {
    const [laps, setLaps] = useState<string[]>([]);
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
        const lapLabel = `${laps.length + 1} - ${formatTime(milliseconds)}`;
        setLaps((prevLaps) => [lapLabel, ...prevLaps]); // Add new lap to the beginning of the array
    };

    const clearLaps =()=>{
        setLaps([])
    }

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className={`${styles.stopwatchContainer} ${classes ?? ""}`}>
            <FormattedTimeDisplay milliseconds={milliseconds} />
            <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                <div className={styles.lapsControlsArea}>
                    <TButton classes={`${isRunning ? '' : styles.hidden}`} btnType="small-rect" label="Lap" icon="plus" actionFunc={addLap} />
                    {
                        laps.length > 0 &&
                        <div className={styles.lapsContainer}>
                            <ul className={styles.lapList}>
                                {laps.slice(0, 3).map((lap, index) => (
                                    <li key={index}>{lap}</li>
                                ))}
                                {/* Render the 3 most recent laps */}
                                {
                                    laps.length > 3 &&
                                    <li>
                                        <span>({laps.length - 3} ) more laps</span>
                                    </li>
                                }
                            </ul>
                            {/* Show extra laps label if there are more than 3 laps */}
                            {
                                laps.length > 0 &&
                                <div className={styles.lapActionsArea}>
                                    {laps.length > 3 && (
                                        <div className={styles.extraLaps}>
                                            <TButton btnType="small-rect" label="View All"  actionFunc={toggleModal} />
                                        </div>
                                    )}
                                    {
                                        laps.length > 0 &&
                                        <TButton btnType="small-rect" label="Clear" icon="close-x" actionFunc={clearLaps} />
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </TimerControls>

            {/* Modal for Viewing All Laps */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} >
                        <h2>All Laps</h2>
                        <ul className={styles.allLapsList}>
                            {laps.map((lap, index) => (
                                <li key={index}>{lap}</li>
                            ))}
                        </ul>
                </Modal>
            )}
        </div>
    );
};

export default StopWatch;
