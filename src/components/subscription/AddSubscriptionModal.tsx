import LoadingScreen from '../ui/LoadingScreen.tsx';
import styles from './AddSubscriptionModal.module.css'
import { Suspense, lazy } from 'react';

const SubscriptionForm = lazy(() => import("./SubscriptionForm.tsx"));

export default function AddSubscriptionModal() {

    return (
        <div className={styles.overlay}>
            <Suspense fallback={<LoadingScreen />}>
                <SubscriptionForm />
            </Suspense>
        </div>
    )
}


