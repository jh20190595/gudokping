import { useState } from 'react';
import styles from './SubscriptionSearch.module.css';

const CATEGORY_TYPE = ['All', 'OTT', 'Shopping', 'AI', 'Food', 'Music'];

export default function SubscriptionSearch({ value, onSearch, onFilter, onSubFilter }) {

    const [text, setText] = useState<string>("");
    const [activeTap, setActiveTap] = useState<'all' | 'sub'>('all')
    const [activeCategory, setActiceCategory] = useState<'All' | 'OTT' | 'Shopping' | 'AI' | 'Food' | 'Music'>("All")

    const handleTapChange = (tap: 'all' | 'sub') => {
        setActiveTap(tap)
        onFilter(tap)
        onSearch("")
    }

    const handleCategoryChange = (category: 'All' | 'OTT' | 'Shopping' | 'AI' | 'Food' | 'Music') => {
        setActiceCategory(category)
        onSubFilter(category)
        onSearch("");
    }

    return (
        <div className={styles.container}>

            <div className={styles.inputTop}>
                <div className={styles.btnWrap}>
                    <div
                        className={styles.moveBackColor}
                        style={{
                            transform: activeTap === 'all' ? 'translateX(0)' : 'translateX(100%)'
                        }}
                    />
                    <button
                        className={activeTap === 'all' ? styles.activeTap : ''}
                        onClick={() => handleTapChange('all')}
                    >
                        <span>All Items</span>
                    </button>
                    <button
                        className={activeTap === 'sub' ? styles.activeTap : ''}
                        onClick={() => handleTapChange('sub')}
                    >
                        <span>Subscriptions only</span>
                    </button>
                </div>

                <input
                    value={value}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder='Search service...'
                    className={styles.textInput}
                />
            </div>

            <div className={styles.divider} />



            <div className={styles.inputBottom}>
                <ul className={styles.categoryWrap}>
                    {CATEGORY_TYPE.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleCategoryChange(item)}
                            className={activeCategory === item ? styles.activeCategory : styles.category}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}