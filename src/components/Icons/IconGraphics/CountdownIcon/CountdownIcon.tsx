import type React from "react";
import commonIconStyles from '../../commonIcons.module.scss';
import type {IconItemProps} from "../../Icon.tsx";

const CountdownIcon: React.FC<IconItemProps> = ({classes, strokedClasses, filledHighlightsClasses }) => {
    return (
        <svg viewBox="0 0 60.58 60.58" width="100%" height="100%" className={classes}>
            <title>Countdown</title>
            <g className={`${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor} ${strokedClasses} `}>
                <g className={`${commonIconStyles.filledHighlight} ${filledHighlightsClasses}`}>
                    <path
                          d="M24.31,13.85c-11.79,0-21.34,9.56-21.34,21.36s9.55,21.34,21.34,21.34c9.2,0,17.05-5.82,20.04-13.98"/>
                    <path
                          d="M55.48,35.2c0-17.21-13.95-31.16-31.16-31.16v14.33c9.3,0,16.83,7.54,16.83,16.83h0s-4.08,0-4.08,0l7.29,7.36,3.97,4,.24-.24,11.02-11.13h-4.1Z"/>
                </g>
                <line x1="39.41" y1="50.29" x2="36.21" y2="47.1"/>
                <polyline points="23.66 23.49 23.66 35.81 31.46 42.3"/>
            </g>
        </svg>
    );
};

export default CountdownIcon;
