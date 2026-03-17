import toast from 'react-hot-toast';
import { useSubscriptionMutation } from '../../hooks/useSubscriptionMutation.tsx';
import styles from './ExtendModal.module.css';
import { Subscription } from '../../types/subscription.tsx';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore.tsx';

interface Props {
    sub: Subscription;
    onClose: (e: React.MouseEvent) => void;
    onOpenEdit : () => void;
}

export default function ExtendModal({ sub, onClose, onOpenEdit }: Props) {
    const { updateMutation } = useSubscriptionMutation();
    const { session } = useAuthStore();
    const userId = session?.user.id

    const nextDateString = getNextDate(sub.next_billing_date, sub.start_date, sub.billing_cycle);

    const handleExtend = (e: React.MouseEvent) => {
        e.stopPropagation();
        updateMutation.mutate(
            { id: sub.id, updateData: { next_billing_date: nextDateString } },
            {
                onSuccess: () => {
                    onClose(e);
                },
                onError: () => toast.error('연장에 실패했어요.')
            }
        );
    };

    return (
            <div className={styles.overlay} onClick={onClose}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <h4>기간을 연장하시겠습니까?</h4>
                    <p style={{ fontSize: '14px', margin: '15px 0' }}>
                        다음 결제일이 <strong>{nextDateString}</strong>로 변경됩니다.
                    </p>
                    <div className={styles.btnWrap}>
                        <button className={styles.cancelBtn} onClick={onClose}>아니오</button>
                        <button className={styles.ExtendBtn} onClick={handleExtend}>연장</button>
                    </div>

                    <div className={styles.editLinkWrap}>
                        <button
                            className={styles.editLinkBtn}
                            onClick={(e) => {
                                onClose(e);
                                onOpenEdit();
                            }}
                        >
                            혹시 결제일이 다르신가요? 직접 수정하기
                        </button>
                    </div>
                </div>
            </div>
    );
}

const getNextDate = (currentDate: string, startDate: string, cycle: string) => {
    const curr = new Date(currentDate); //next_billing_date 날짜
    const start = new Date(startDate); // 구독을 시작한 start_date 날짜
    const originalDay = start.getDate();

    if (cycle === 'yearly') {
        curr.setFullYear(curr.getFullYear() + 1);
    } else {
        curr.setDate(1); // 월 점프 버그 방지함.
        curr.setMonth(curr.getMonth() + 1);
    }

    const lastDayOfMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate();
    const resultDay = originalDay > lastDayOfMonth ? lastDayOfMonth : originalDay;
    curr.setDate(resultDay);

    const y = curr.getFullYear();
    const m = String(curr.getMonth() + 1).padStart(2, '0');
    const d = String(curr.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};