import commonIconStyles from '../../commonIcons.module.scss';
import type React from 'react';

const XYicon: React.FC = () => {
    return (
        <svg viewBox="0 0 60.58 60.58" width="100%" height="100%">
            <title>XYicon</title>
            <g className={`${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor}`}>
                <circle className={`${commonIconStyles.filledHighlight}`} cx="30.71" cy="34.57" r="24.04" />
                <rect x="26.56" y="2.98" width="8.3" height="4.77" />
                <line x1="30.71" y1="7.98" x2="30.71" y2="10.53" />
                <line x1="31.25" y1="42.06" x2="31.25" y2="53.58" />
                <line x1="23.75" y1="34.57" x2="12.24" y2="34.57" />
                <line x1="25.95" y1="39.87" x2="17.81" y2="48.01" />
                <path d="M25.95,29.28c1.35-1.36,3.23-2.2,5.3-2.2h0s0-11.51,0-11.51h0c-5.25,0-10,2.12-13.44,5.57-3.43,3.44-5.56,8.19-5.56,13.44s2.13,10,5.56,13.43c3.44,3.44,8.19,5.57,13.44,5.57s10-2.13,13.44-5.57h0s-8.14-8.14-8.14-8.14h0c-1.35,1.36-3.23,2.19-5.3,2.19s-3.95-.84-5.3-2.19-2.19-3.23-2.19-5.3.84-3.95,2.19-5.3" />
                <line x1="25.95" y1="29.27" x2="17.81" y2="21.13" />
                <polyline points="40.39 12.56 42.13 9.17 45.74 11.02 43.95 14.51" />
                <polyline points="17.48 14.51 15.69 11.02 19.29 9.17 21.03 12.56" />
            </g>
        </svg>
    );
};

export default XYicon;
