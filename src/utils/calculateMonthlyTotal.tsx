export const calculateMonthlyTotal = (subscriptions, currentYear, m) => {
    if (!subscriptions) return 0;

    return subscriptions.reduce((acc, sub) => {
        const start = new Date(sub.startDate);
        const startY = start.getFullYear();
        const startM = start.getMonth() + 1; 


        if (startY === currentYear && startM === m) {
            return acc + sub.price || 0;
        }

        return acc;
    }, 0);
};