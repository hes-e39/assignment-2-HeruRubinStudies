import type React from 'react';
import commonIconStyles from '../../commonIcons.module.scss';
import type {IconItemProps} from "../../Icon.tsx";

const PlusIcon: React.FC<IconItemProps> = ({ classes, strokedClasses }) => {
    return (
        <svg className={`${classes} ${commonIconStyles.icon}`} viewBox="0 0 60.58 60.58">
            <title>Plus</title>
            <g className={`${strokedClasses} ${commonIconStyles.strokeThick} `}>
                <line x1="54.54" y1="30.29" x2="6.05" y2="30.29" />
                <line x1="30.29" y1="6.05" x2="30.29" y2="54.54" />
            </g>
        </svg>
    );
};

export default PlusIcon;
