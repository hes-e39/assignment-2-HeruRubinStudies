import type { StylingBase } from '../../../DataInterfaces/CommonInterfaces.tsx';
import type React from 'react';
import commonIconStyles from '../../commonIcons.module.scss';

const MenuIcon: React.FC<StylingBase> = () => {
    return (
<svg  viewBox="0 0 60.58 60.58" className={commonIconStyles.icon}>
    <title>Menu</title>
    <g className={`${commonIconStyles.strokeThick} ${commonIconStyles.stroked} ${commonIconStyles.primaryStrokeColor}`}>
        <g>
            <line x1="41.96" y1="13.65" x2="50.71" y2="13.65"/>
            <line x1="9.88" y1="13.65" x2="34.79" y2="13.65"/>
        </g>
        <g>
            <line x1="28.1" y1="30.29" x2="50.71" y2="30.29"/>
            <line x1="9.88" y1="30.29" x2="20.93" y2="30.29"/>
        </g>
        <line x1="9.88" y1="46.94" x2="50.71" y2="46.94"/>
    </g>
</svg>
    );
};

export default MenuIcon;