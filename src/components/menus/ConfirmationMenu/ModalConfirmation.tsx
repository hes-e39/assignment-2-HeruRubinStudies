import type React from "react";
import type {ReactNode} from "react";
import TButton from "../../generic/Button/TButton.tsx";
import styles from "./ConfirmationMenu.module.scss";

interface ConfirmationMenuProps{
    apply : ()=>void;
    applyLabel : string | ReactNode;
    cancel : () => void;
    cancelLabel : string | ReactNode;
}

const ConfirmationMenu : React.FC<ConfirmationMenuProps> =({apply, cancel, applyLabel, cancelLabel})=>{
    return (
        <div className={styles.modalBtns}>
            <TButton btnType="small-rect" actionFunc={apply} label={applyLabel}/>
            <TButton btnType="small-rect" actionFunc={cancel} label={cancelLabel}/>
        </div>
    )
}

export default ConfirmationMenu;