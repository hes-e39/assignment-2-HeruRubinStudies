import type React from "react";
import commonIconStyles from "./commonIcons.module.scss";
import StopwatchIcon from "./IconGraphics/StopwatchIcon/StopwatchIcon.tsx";
import XYicon from "./IconGraphics/XYicon/XYicon.tsx";
import TabataIcon from "./IconGraphics/TabataIcon/TabataIcon.tsx";
import CountdownIcon from "./IconGraphics/CountdownIcon/CountdownIcon.tsx";
import type {StylingBase} from "../DataInterfaces/CommonInterfaces.tsx";
import DocumentationIcon from "./IconGraphics/DocumentationIcon/DocumentationIcon.tsx";
import TimersIcon from "./IconGraphics/TimersIcon/TimersIcon.tsx";
import CheckmarkIcon from "./IconGraphics/CheckmarkIcon/CheckmarkIcon.tsx";
import CloseX from "./IconGraphics/CloseXIcon/CloseX.tsx";
import PlusIcon from "./IconGraphics/PlusIcon/PlusIcon.tsx";
import MenuIcon from "./IconGraphics/MenuIcon/MenuIcon.tsx";

export type iconGraphic = "countdown" | "stopwatch" | "xy" | "tabata" | "menu" | "timers" | "checkmark" | "documentation" | "close-x" | "plus";

export interface IconProps extends StylingBase {
    iconName : iconGraphic;
}

const Icon : React.FC<IconProps> =({iconName, classes})=>{
    const getIcon =()=>{
        switch (iconName){
            case "stopwatch":
                return <StopwatchIcon/>;
            case "xy":
                return <XYicon/>;
            case "tabata":
                return <TabataIcon />;
            case "countdown":
                return <CountdownIcon/>;
            case "checkmark":
                return <CheckmarkIcon/>;
            case "documentation":
                return <DocumentationIcon/>;
            case "timers":
                return <TimersIcon />
            case "close-x":
                return  <CloseX />
            case "plus":
                return <PlusIcon />
            case "menu":
                return <MenuIcon />
        }
    }

    return(
        <div className={`${commonIconStyles.icon} ${classes ?? ''}` }>
            {getIcon()}
        </div>
    )
}

export default Icon