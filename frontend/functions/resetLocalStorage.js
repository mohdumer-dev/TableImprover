// Utility to reset corrupted localStorage
export default function resetLocalStorage() {
    try {
        // Clear the corrupted UniData
        localStorage.removeItem("UniData");
        
        // Set fresh, clean data
        localStorage.setItem("UniData", JSON.stringify({ 
            activeItem: "dashboard",
            completed: "false" 
        }));
        
        console.log("localStorage has been reset successfully");
        return true;
    } catch (error) {
        console.error("Failed to reset localStorage:", error);
        return false;
    }
}

// Function to check if localStorage is corrupted
export function isLocalStorageCorrupted() {
    try {
        const stored = localStorage.getItem("UniData");
        if (!stored) return false;
        
        JSON.parse(stored);
        return false; // No corruption
    } catch (error) {
        return true; // Corrupted
    }
}
