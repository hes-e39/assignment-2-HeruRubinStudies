import type React from "react";
import commonBrandingStyles from "../commonBrand.module.scss";


const Logotype : React.FC =()=>{
    return(
        <svg width="100%" height="100%" viewBox="0 0 68.58 11.98">
            <title>Logotype</title>
            <g className={commonBrandingStyles.brandMain}>
                <path d="M4.05,1.02v7.1h-1.03V1.02H0V.14h7.09v.88h-3.03Z"/>
                <path d="M14.96,8.12h-6.17V.14h6.06v.88h-5.02v2.64h4.33v.86h-4.33v2.72h5.13v.88Z"/>
                <path
                    d="M25.17,8.12V1.38l-3,5.88h-1.14l-3-5.89v6.75h-1.03V.14h1.54l3.06,6.01L24.67.14h1.54v7.98h-1.03Z"/>
                <path
                    d="M29.82,8.13h-1.02V.16h3.92c1.66,0,2.66.86,2.66,2.11s-1.01,2.15-2.66,2.15h-2.89v3.72ZM32.72,3.53c1.03,0,1.6-.5,1.6-1.27s-.56-1.24-1.6-1.24h-2.89v2.51h2.89Z"/>
                <path
                    d="M36.8,4.13c0-2.43,1.93-4.13,4.55-4.13s4.56,1.69,4.56,4.13-1.93,4.14-4.56,4.14-4.55-1.69-4.55-4.14ZM44.84,4.13c0-1.92-1.43-3.24-3.49-3.24s-3.48,1.33-3.48,3.24,1.43,3.25,3.48,3.25,3.49-1.33,3.49-3.25Z"/>
            </g>
            <g className={commonBrandingStyles.brandSecondary}>
                <path
                    d="M55.93,8.12V3.07l-2.18,4.26h-1.46l-2.18-4.26v5.05h-1.63V.14h1.97l2.58,5.07L55.6.14h1.96v7.98h-1.63Z"/>
                <path
                    d="M59.59,4.13c0-2.43,1.9-4.13,4.51-4.13s4.49,1.69,4.49,4.13-1.89,4.14-4.49,4.14-4.51-1.69-4.51-4.14ZM66.92,4.13c0-1.55-1.15-2.6-2.82-2.6s-2.84,1.07-2.84,2.6,1.16,2.61,2.84,2.61,2.82-1.07,2.82-2.61Z"/>
            </g>
            <rect className={commonBrandingStyles.brandSecondary} x="48.47" y="10.04" width="19.59" height="1.94"/>
        </svg>
    )
}

export default Logotype;