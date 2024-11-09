import type React from "react";
import commonIconStyles from "../../commonIcons.module.scss";
const TimersIcon : React.FC=()=>{
    return(
        <svg className={commonIconStyles.icon} viewBox="0 0 60.58 60.58" width="100%" height="100%">
            <title>Timers Icon</title>
            <g>
                <g className={`${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor}`}>
                    <circle cx="30.29" cy="30.29"
                            r="26.98"/>
                    <path className="brandSecondary"
                          d="M18.67,18.68l6.86,13.84c.95,1.91,2.85,3.26,4.99,3.26,1.54,0,3.07-.59,4.24-1.76.15-.15.28-.3.41-.46,2.39-2.94,1.06-7.4-2.43-8.89l-14.07-6.01Z"/>
                </g>
                <g className={`${commonIconStyles.filledPrimary} `}>
                    <rect x="29.49" y="6.69" width="3.06" height="4.51"/>
                    <rect x="29.49" y="49.41" width="3.06" height="4.51"/>
                    <rect x="49.73" y="27.72" width="3.06" height="4.51"
                          transform="translate(81.23 -21.29) rotate(90)"/>
                    <rect x="8.04" y="27.72" width="3.06" height="4.51"
                          transform="translate(39.54 20.41) rotate(90)"/>
                </g>
            </g>
        </svg>
    )
}

export default TimersIcon;