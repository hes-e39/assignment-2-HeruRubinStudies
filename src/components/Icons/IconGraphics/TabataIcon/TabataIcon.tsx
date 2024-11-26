import commonIconStyles from "../../commonIcons.module.scss";
import type React from "react";
import type {IconItemProps} from "../../Icon.tsx";



const TabataIcon: React.FC<IconItemProps> = ({classes, filledClasses, filledHighlightsClasses, strokedClasses }) => {
    return (
    <svg className={`${commonIconStyles.icon} ${classes ?? ''}`} viewBox="0 0 60.58 60.58">
        <title>Tabata</title>
        <path className={`${commonIconStyles.stroked} ${strokedClasses}`} d="M48.74,27.78v23.95c0,3.28-2.66,5.94-5.94,5.94H9.23c-3.28,0-5.94-2.66-5.94-5.94V18.16c0-3.28,2.66-5.94,5.94-5.94h22.5"/>
        <path id="filled_outer" className={`${commonIconStyles.filledHighlight} ${filledHighlightsClasses}`} d="M48.74,27.78v23.95c0,3.28-2.66,5.94-5.94,5.94H9.23c-3.28,0-5.94-2.66-5.94-5.94V18.16c0-3.28,2.66-5.94,5.94-5.94h22.5"/>
        <line className={`${commonIconStyles.stroked} ${strokedClasses}`} x1="3.73" y1="22.64" x2="32.73" y2="22.64"/>
        <line data-name="stroked" className={`${commonIconStyles.stroked} ${strokedClasses}`} x1="3.73" y1="45.67" x2="48.74" y2="45.67"/>
        <line data-name="stroked" className={`${commonIconStyles.stroked} ${strokedClasses}`} x1="3.73" y1="34.15" x2="48.74" y2="34.15"/>
        <path id="highlightFill" className={`${commonIconStyles.filledPrimary} ${filledClasses}`}  d="M32.73,14.53H9.02c-1.95,0-3.52,1.58-3.52,3.52v4.12h28.11c-.77-1.94-1.3-4.19-.88-7.64Z"/>
        <rect className={`${commonIconStyles.filledPrimary} ${filledClasses}`} data-name="highlightFill" x="5.5" y="36.38" width="40.72" height="9.29"/>
        <g id="clock">
            <circle data-name="Filled" className={`${commonIconStyles.filledHighlight} ${filledHighlightsClasses}`} cx="44.72" cy="15.4" r="12.57"/>
            <circle data-name="Filled" className={`${commonIconStyles.stroked} ${strokedClasses}`} cx="44.72" cy="15.4" r="12.57"/>
            <path id="stroked-4" data-name="stroked" className={`${commonIconStyles.stroked} ${strokedClasses}`} d="M39.3,9.98l3.2,6.45c.44.89,1.33,1.52,2.32,1.52.72,0,1.43-.27,1.98-.82.07-.07.13-.14.19-.21,1.12-1.37.49-3.45-1.13-4.14l-6.56-2.8Z"/>
            <g id="clockTicks" className={`${commonIconStyles.filledPrimary} ${filledClasses}`} >
                <rect id="highlightFill-3" data-name="highlightFill" x="44.34" y="4.4" width="1.42" height="2.1"/>
                <rect id="highlightFill-4" data-name="highlightFill" x="44.34" y="24.31" width="1.42" height="2.1"/>
                <rect id="highlightFill-5" data-name="highlightFill" x="53.78" y="14.2" width="1.42" height="2.1" transform="translate(69.74 -39.24) rotate(90)"/>
                <rect id="highlightFill-6" data-name="highlightFill" x="34.35" y="14.2" width="1.42" height="2.1" transform="translate(50.31 -19.81) rotate(90)"/>
            </g>
        </g>
    </svg>
    )
}

export default TabataIcon;



