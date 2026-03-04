import { useState } from "react";
import styles from './SortButton.module.css'
import { ChevronDown, TreePalm } from "lucide-react";

const SORT_OPTIONS = [
    { label: "가격순", value: "price" },
    { label: "등록순", value: "created_at" }
];

type Props = {
    currentType : string;
    onChange : (type:string) => void
}

export default function SortButton({ currentType, onChange } : Props) {

    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (type :string) => {
        onChange(type)
        setIsOpen(false);
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentType === 'created_at' ? '등록순' : '가격순'}
                <ChevronDown size={16} className={isOpen ? styles.open : ''}/>
            </button>

            {isOpen && (
                <ul className={styles.menu}>
                    {SORT_OPTIONS.map((type) => (
                        <li 
                            key={type.value}
                            className={styles.item}
                            onClick={() => handleSelect(type.value)}
                        >
                            {type.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}