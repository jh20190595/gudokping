import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useMutation } from '@tanstack/react-query';
import styles from './Feedback.module.css';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.ts';

export default function Feedback() {
    const { session } = useAuthStore();
    
    const userId = session?.user?.id;
    const userEmail = session?.user?.email || "";
    
    const [category, setCategory] = useState("기능 제안");
    const [content, setContent] = useState("");

    const submitFeedbackMutation = useMutation({
        mutationFn: async (newFeedback: any) => {
            const { data, error } = await supabase
                .from('feedbacks')
                .insert([newFeedback]);
            
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            toast.success("소중한 의견이 성공적으로 등록되었습니다! 🎉");
            setContent("");
        },
        onError: (error: Error) => {
            toast.error("전송에 실패했습니다: " + error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return toast.error("내용을 입력해주세요!");

        submitFeedbackMutation.mutate({
            user_id: userId,
            user_email: userEmail,
            category: category,
            content: content
        });
    };

    const isSubmitting = submitFeedbackMutation.isPending;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Feedback</h2>
            <p className={styles.description}>
                앱을 사용하며 느끼신 불편함이나 아이디어를 자유롭게 남겨주세요. <br/>
                보내주신 소중한 의견은 서비스 개선에 적극 반영됩니다!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>카테고리</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.select}
                    >
                        <option>기능 제안</option>
                        <option>버그 제보</option>
                        <option>디자인 의견</option>
                        <option>기타</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>답변 받을 이메일</label>
                    <input 
                        type="text" 
                        value={userEmail} 
                        disabled 
                        className={styles.disabledInput}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>내용</label>
                    <textarea 
                        placeholder="여기에 내용을 입력해주세요..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={styles.textarea}
                        rows={6}
                    />
                </div>

                <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "전송 중..." : "피드백 보내기"}
                </button>
            </form>
        </div>
    );
}