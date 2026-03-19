import { useSubscriptionMutation } from '../../hooks/useSubscriptionsQuery.ts';
import styles from './DeleteModal.module.css';

type Props = {
    id : string,
    onClose : (e : React.MouseEvent) => void;
}

export default function DeleteModal({id, onClose} : Props) {

    const { deleteMutation } = useSubscriptionMutation();

    const handleDelete = (e :React.MouseEvent) => {
        e.stopPropagation();
        deleteMutation.mutate(id,{
            onSuccess : () => {
                console.log('삭제 완료데시타')
            }
        })
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h5>정말로 삭제하시겠습니까?</h5>
                <div className={styles.btnWrap}>
                    <button className={styles.cancelBtn} onClick={onClose}>아니오</button>
                    <button className={styles.deleteBtn} onClick={(e) => handleDelete(e)}>삭제</button>
                </div>
            </div>
        </div>
    )
}