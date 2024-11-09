import type React from "react";
import commonStyles from "../../commonIcons.module.scss";
import type {StylingBase} from "../../../DataInterfaces/CommonInterfaces.tsx";
import commonIconStyles from "../../commonIcons.module.scss";


const StopwatchIcon : React.FC<StylingBase> = ({classes}) => {
    return (
        <svg viewBox="0 0 60.58 60.58" width="100%" height="100%" className={`${commonStyles.icon} ${classes ?? ""}`}>
            <title>Stopwatch</title>
            <g className={`${commonStyles.stroked} ${commonStyles.primaryStrokeColor}`}>
                <circle className={`${commonIconStyles.filledHighlight}`} cx="24.04" cy="38.38" r="20.77"/>
                <circle cx="24.04" cy="38.38" r="15.89"/>
                <rect x="37.35" y="13.43" width="9.9" height="5.33" rx="1.84" ry="1.84"
                      transform="translate(19.77 -23.15) rotate(39.32)"/>
                <polyline points="38.68 23.64 42.14 19.42 39.07 16.9 35.61 21.12"/>
                <path
                    d="M40,22.03c4.64,2.67,10.46,1.87,13.73-2.13,3.68-4.49,2.76-11.32-2.06-15.27-4.81-3.94-11.7-3.49-15.37.99-3.27,4-2.91,9.86.62,13.88"/>
                <polyline points="23.4 27.7 23.4 40.23 33.37 40.23"/>
            </g>
        </svg>
    );
};

export default StopwatchIcon;
