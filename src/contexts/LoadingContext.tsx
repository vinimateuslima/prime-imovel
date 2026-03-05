import { createContext, useContext, useState } from "react";
import './LoadingContext.css'

interface LoadingContextType {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const LoadingContext = createContext({} as LoadingContextType);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}
