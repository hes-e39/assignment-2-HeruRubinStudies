
import commonIconStyles from "../../commonIcons.module.scss";
const TabataIcon = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 60.58 60.58">
            <title>Tabata</title>
            <g>
                <rect className={`${commonIconStyles.filledHighlight} ${commonIconStyles.primaryStrokeColor}`} x="3.92" y="12.87" width="43.8" height="43.8"
                      rx="5.73" ry="5.73"/>
                <g className={commonIconStyles.filledPrimary}>
                    <line x1="4.34" y1="22.91" x2="47.72" y2="22.91"/>
                    <line x1="4.34" y1="45.1" x2="47.72" y2="45.1"/>
                    <line x1="4.34" y1="34.01" x2="47.72" y2="34.01"/>
                </g>
                <path className={commonIconStyles.filledPrimary}
                      d="M33.14,15.1H9.44c-1.87,0-3.39,1.52-3.39,3.39v3.97h27.1v-7.36Z"/>
                <rect className={commonIconStyles.filledPrimary} x="6.04" y="36.15" width="39.25" height="8.95"/>
                <circle
                    className={`${commonIconStyles.filledHighlight} ${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor}`}
                    cx="43.84" cy="17.86" r="12.12"/>
                <path className={`${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor}`}
                      d="M38.62,12.64l3.08,6.22c.43.86,1.28,1.46,2.24,1.46.69,0,1.38-.26,1.9-.79.07-.07.13-.13.18-.2,1.08-1.32.47-3.32-1.09-3.99l-6.32-2.7Z"/>
                <g className={`${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor}`}>
                    <rect x="43.48" y="7.25" width="1.37" height="2.03"/>
                    <rect x="43.48" y="26.45" width="1.37" height="2.03"/>
                    <rect x="52.58" y="16.7" width="1.37" height="2.03"
                          transform="translate(70.97 -35.55) rotate(90)"/>
                    <rect x="33.85" y="16.7" width="1.37" height="2.03"
                          transform="translate(52.25 -16.82) rotate(90)"/>
                </g>
            </g>
        </svg>
    )
}

export default TabataIcon;



