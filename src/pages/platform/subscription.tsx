import SummaryCards from '../../components/dashBoard/SummaryCards.tsx';
import SubscriptionSearch from '../../components/subscription/SubscriptionSearch.tsx';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import { useState, useMemo } from 'react';

import styles from './subscription.module.css';
import SubscriptionList from '../../components/subscription/SubscriptionList.tsx';
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import { useModalStore } from '../../store/useModalStore.tsx';



export default function Subscription() {

    const { openForm } = useModalStore();

    const [searchText, setSearchText] = useState("")
    const [filter, setFilter] = useState<'all' | 'sub'>('all')
    const [subFilter, setSubFilter] = useState<'All' | 'OTT' | 'Shopping' | 'AI' | 'Food' | 'Music'>('All')
    const { data: subscriptions } = useSubscriptions('created_at');

    const filterData = useMemo(() => {
        if (!subscriptions) return [];

        const data = filter === 'all' ? SUBSCRIPTION_SERVICES : (subscriptions ?? []);

        return data.filter((item) => {
            const matchCategory = subFilter === 'All' ? true : item.category.toLowerCase() === subFilter.toLowerCase();
            const matchSearch = item.service_name.toLowerCase().includes(searchText.toLowerCase());

            return matchCategory && matchSearch
        })

    }, [subscriptions, filter, subFilter, searchText])


    return (
        <div className={styles.container}>
            
            <SummaryCards />
            <div className={styles.divider}></div>

            <div className={styles.searchWrap}>
                <SubscriptionSearch
                    value={searchText}
                    onSearch={setSearchText}
                    onFilter={setFilter}
                    onSubFilter={setSubFilter}
                />
            </div>

            <p className={styles.countText}>Showing {filterData.length} items</p>

            <div className={styles.ListViewWrap}>
                <SubscriptionList data={filterData} />
            </div>



        </div>

    )
}