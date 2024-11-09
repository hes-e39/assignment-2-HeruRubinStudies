import type React from "react";
import commonStyles from '../../commonIcons.module.scss';
import type {StylingBase} from "../../../DataInterfaces/CommonInterfaces.tsx";


const CheckmarkIcon:React.FC<StylingBase> = ({classes}) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 60.58 60.58" className={`${classes ?? ""} ${commonStyles.icon}`}>
            <title>Checkmark</title>
            <polyline className={`${commonStyles.icon} ${commonStyles.primaryStrokeColor}`} points="47.93 17.17 21.7 43.41 12.65 34.36" />
        </svg>
    );
};

export default CheckmarkIcon;
