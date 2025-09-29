export default function auLocal(localName, itemName, itemValue) {
    try {
        const stored = localStorage.getItem(localName);
        let oldLocal = {};
        
        // Try to parse existing data, fallback to empty object if corrupted
        if (stored) {
            try {
                oldLocal = JSON.parse(stored);
                // Ensure it's an object
                if (typeof oldLocal !== 'object' || oldLocal === null) {
                    oldLocal = {};
                }
            } catch (parseError) {
                console.warn('Corrupted localStorage data, resetting:', parseError);
                oldLocal = {};
            }
        }

        const newLocal = { ...oldLocal, [itemName]: itemValue };
        localStorage.setItem(localName, JSON.stringify(newLocal));
    } catch (error) {
        console.error('Error updating localStorage:', error);
        // Fallback: create fresh localStorage entry
        try {
            localStorage.setItem(localName, JSON.stringify({ [itemName]: itemValue }));
        } catch (fallbackError) {
            console.error('Failed to create fallback localStorage entry:', fallbackError);
        }
    }
}