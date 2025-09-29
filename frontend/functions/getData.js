export default function getData(localName, itemName) {
    try {
        const stored = localStorage.getItem(localName);
        if (!stored) {
            return null;
        }
        const obj = JSON.parse(stored);
        return obj && obj[itemName] ? obj[itemName] : null;
    } catch (error) {
        console.error('Error getting data from localStorage:', error);
        return null;
    }
}