import { createContext, useState } from 'react';

const Mode = null
const ModeContext = createContext(Mode)

const ModeContextProvider = ({children}) => {
    const [mode, setMode] = useState(Mode)
    return (
        <ModeContext.Provider value={{mode, setMode}}>
            {children}
        </ModeContext.Provider>
    )
}
export {ModeContextProvider, ModeContext}