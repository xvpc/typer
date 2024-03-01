import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

type contextValues = {
    language: string,
    setLanguage: Dispatch<SetStateAction<string>>,
    time: number,
    setTime: Dispatch<SetStateAction<number>>,
    userSpeed: number,
    setUserSpeed: Dispatch<SetStateAction<number>>,
    userAccuracy: number,
    setUserAccuracy: Dispatch<SetStateAction<number>>,
    gamestatus: "default" | "started" | "finish",
    setGamestatus: Dispatch<SetStateAction<"default" | "started" | "finish">>,
} | null;

export const userContext = createContext<contextValues>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState('en-us');
    const [time, setTime] = useState(60);
    const [gamestatus, setGamestatus] = useState<"default" | "started" | "finish">("default");
    const [userSpeed, setUserSpeed] = useState(0);
    const [userAccuracy, setUserAccuracy] = useState(0);


    return (
        <userContext.Provider value={{language, setLanguage, time, setTime, userSpeed, setUserSpeed, userAccuracy, setUserAccuracy, gamestatus, setGamestatus}}>
            {children}
        </userContext.Provider>
    )
}
