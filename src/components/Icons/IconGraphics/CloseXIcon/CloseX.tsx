import commonIconStyles from "../../commonIcons.module.scss";
import type {IconItemProps} from "../../Icon.tsx";
import type React from "react";

const CloseXIconGraphics : React.FC<IconItemProps> = ({strokedClasses, classes}) => {
    return (
        <svg className={`${strokedClasses && commonIconStyles.icon} ${classes && classes}`} viewBox="0 0 60.58 60.58">
            <title>Close X</title>
            <g className={`${strokedClasses && strokedClasses} ${commonIconStyles.strokeThick}`}>
                <line x1="57.82" y1="2.76" x2="2.76" y2="57.82"/>
                <line x1="2.76" y1="2.76" x2="57.82" y2="57.82"/>
            </g>
        </svg>
    );
};

export default CloseXIconGraphics;