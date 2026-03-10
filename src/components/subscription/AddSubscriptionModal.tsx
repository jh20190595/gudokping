import styles from './AddSubscriptionModal.module.css'
import SubscriptionForm from "./SubscriptionForm.tsx";

export default function AddSubscriptionModal() {

    return (
        <div className={styles.overlay}>
            <SubscriptionForm/>
        </div>
    )
}


