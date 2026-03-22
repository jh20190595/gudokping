import styles from './Card.module.css';

interface Props {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    logo? : string;
}

export default function Card({ title, value, icon, color,logo }: Props) {
    return (
        <div className={styles.cardBox} style={{ backgroundColor: color }}>
            <div className={styles.itemHeader}>
                <div className={styles.itemIcon}>{icon}</div>
                <div className={styles.itemTitle}>{title}</div>
            </div>
            <div className={styles.itemContent}>
                {logo && <img src={logo} alt="logo" style={{ width : '50px',height : '30px', borderRadius : '30%' ,objectFit : 'contain' , display : 'block'}}/>}
                <div className={styles.itemValue}>{value}</div>
            </div>
        </div>
    )
}