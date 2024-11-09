import commonIconStyles from "../../commonIcons.module.scss";

const CloseXIconGraphics = () => {
    return (
        <svg className={commonIconStyles.icon} viewBox="0 0 60.58 60.58">
            <title>Close X</title>
            <g className={`${commonIconStyles.strokeThick} ${commonIconStyles.primaryStrokeColor} ${commonIconStyles.primaryStrokeColor}`}>
                <line x1="57.82" y1="2.76" x2="2.76" y2="57.82"/>
                <line x1="2.76" y1="2.76" x2="57.82" y2="57.82"/>
            </g>
        </svg>
    );
};

export default CloseXIconGraphics;