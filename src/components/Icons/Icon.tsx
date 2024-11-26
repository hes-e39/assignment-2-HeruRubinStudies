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

export interface IconItemProps extends IconStyling {
    classes?: string;
}

export interface IconStyling{
    strokedClasses? : string;
    strokedHighlightsClasses? : string;
    filledClasses? : string;
    filledHighlightsClasses? : string;
}

export interface IconProps extends StylingBase, IconStyling {
    iconName : iconGraphic;
    iconMode? : "dark-on-light" | "light-on-dark"
}

const Icon : React.FC<IconProps> =({iconName, classes, strokedClasses, filledClasses, filledHighlightsClasses, strokedHighlightsClasses})=>{
    const getIcon =()=>{
        switch (iconName){
            case "stopwatch":
                return <StopwatchIcon filledClasses={filledClasses} strokedClasses={strokedClasses} filledHighlightsClasses={filledHighlightsClasses} strokedHighlightsClasses={strokedHighlightsClasses}/>;
            case "xy":
                return <XYicon filledClasses={filledClasses} strokedClasses={strokedClasses} />;
            case "tabata":
                return <TabataIcon classes={classes} filledClasses={filledClasses} filledHighlightsClasses={filledHighlightsClasses} strokedClasses={strokedClasses} />;
            case "countdown":
                return <CountdownIcon classes={classes} filledHighlightsClasses={filledHighlightsClasses} strokedClasses={strokedClasses} strokedHighlightsClasses={strokedHighlightsClasses}/>;
            case "checkmark":
                return <CheckmarkIcon classes={classes} strokedClasses={strokedClasses}/>;
            case "documentation":
                return <DocumentationIcon/>;
            case "timers":
                return <TimersIcon />
            case "close-x":
                return  <CloseX classes={classes} strokedClasses={strokedClasses} />
            case "plus":
                return <PlusIcon classes={classes} strokedClasses={strokedClasses} />
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