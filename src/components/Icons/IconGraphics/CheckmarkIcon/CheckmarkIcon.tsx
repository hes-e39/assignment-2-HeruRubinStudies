import type React from "react";
import type {IconItemProps} from "../../Icon.tsx";
import commonStyles from '../../commonIcons.module.scss';
import styles from "./checkmark.module.scss";



const CheckmarkIcon:React.FC<IconItemProps> = ({classes, strokedClasses}) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 60.58 60.58" className={`${classes ?? ""} ${commonStyles.icon} ${styles.checkMark}`}>
            <title>Checkmark</title>
            <polyline className={`${commonStyles.icon} ${commonStyles.primaryStrokeColor} ${strokedClasses} ${styles.stroked}`} points="47.93 17.17 21.7 43.41 12.65 34.36" />
        </svg>
    );
};

export default CheckmarkIcon;
