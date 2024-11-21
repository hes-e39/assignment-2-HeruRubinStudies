import type React from "react";


export type NumberedListItem = {numberLabel? : string, nameLabel:string};

export interface NumberedListProps {
    listItems: NumberedListItem[];
    generateNumberLabels? : boolean;
    classes? : string;
    itemClasses? : {
        numberLabel? : string;
        nameLabel? : string;
    }
}

const NumberedList : React.FC<NumberedListProps> =({listItems, generateNumberLabels})=>{
    return (
        <>
            {
                listItems.map((item, index) => (
                    <li key={item.numberLabel} >
                        <span>{generateNumberLabels ? index : item.numberLabel}</span>
                        <span>{item.nameLabel}</span>
                    </li>
                ))
            }
        </>
    )
}

export default NumberedList;