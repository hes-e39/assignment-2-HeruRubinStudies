import type React from "react";
import styles from "./TButton.module.scss";
import Icon from "../../Icons/Icon.tsx";
import type {iconGraphic} from "../../Icons/Icon.tsx";


export interface TButtonProps {
    btnType : "round-large" | "round-small" | "small-rect" | "med-rect";
    flair? : "shimmer";
    hoverAni? : "grow"
    actionFunc? : ()=>void;
    label? : string;
    icon? : iconGraphic;
    classes? : string;
}

const TButton : React.FC<TButtonProps> = ({label, icon, flair, btnType, actionFunc, classes, hoverAni}) =>{

    const getHoverAni=()=>{
        switch (hoverAni){
            case "grow":
                return styles.growAni
        }
    }

    const getFlair=()=>{
        switch (flair){
            case "shimmer":
                return styles.shimmer
            //add more flair here
        }
    }

    const getAdorners =()=>{
        return (
            <>
                {
                    label &&
                    <div className={styles.labelArea}><span>{label}</span></div>
                }
                {
                    icon &&
                    <Icon iconName={icon} classes={styles.icon} />
                }
            </>
        )
    }

    const getBtnType =()=>{
        switch (btnType) {
            case "round-large":
                return styles.roundLarge;
            case "round-small":
                return styles.roundSmallButton;
            case "small-rect":
                return styles.rectBtnSmall;
            case "med-rect":
                return styles.rectBtnMed;
            default:
                return null;
        }
    }

    return (
        <button className={`${styles.btnBase} ${getBtnType()} ${getFlair()} ${getHoverAni()} ${classes ?? ""} `} onClick={actionFunc}>{getAdorners() }</button>
    )
}

export default TButton