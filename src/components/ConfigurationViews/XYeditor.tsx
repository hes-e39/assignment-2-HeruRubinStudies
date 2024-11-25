import type React from "react";
import commonTimerStyles from "../timers/timer-common.module.scss";
import NumberStepper from "../generic/NumberStepper/NumberStepper.tsx";
import TButton from "../generic/Button/TButton.tsx";

interface XYEditorProps {
    totalRounds : number;
    setTotalRounds : (totalRounds : number) => void;
    roundMinutes : number;
    setRoundMinutes : (roundMinutes : number) => void;
    roundSeconds : number;
    setRoundSeconds : (roundSeconds : number) => void;
    applyCustomConfig : ()=>void;
    toggleModal : () => void;
}

const XYEditor: React.FC<XYEditorProps> = ({totalRounds, setTotalRounds, roundMinutes, setRoundMinutes, roundSeconds, setRoundSeconds, applyCustomConfig, toggleModal}) => {
    return(
        <>
            <div className={commonTimerStyles.inputsArea}>
                <div className={commonTimerStyles.steppersArea}>
                    <div className={commonTimerStyles.nonTimeInputArea}>
                        <NumberStepper
                            label="Rounds"
                            value={totalRounds}
                            onChange={(newValue: number) => setTotalRounds(newValue)}
                            min={1}
                            max={100}
                            step={1}
                        />
                    </div>
                    <NumberStepper
                        label={<>Minutes<br/>per Round</>}
                        value={roundMinutes}
                        onChange={(newValue: number) => setRoundMinutes(newValue)}
                        min={0}
                        max={59}
                        step={1}
                    />
                    <NumberStepper
                        label={<>Seconds<br/>per Round</>}
                        value={roundSeconds}
                        onChange={(newValue: number) => setRoundSeconds(newValue)}
                        min={0}
                        max={59}
                        step={1}
                    />
                </div>
            </div>
            <div className={commonTimerStyles.modalBtns}>
                <TButton btnType="small-rect" actionFunc={applyCustomConfig} label="Apply"/>
                <TButton btnType="small-rect" actionFunc={toggleModal} label="Cancel"/>
            </div>
        </>
    )
}

export default XYEditor;