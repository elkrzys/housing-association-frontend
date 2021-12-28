import { createContext, useState, useCallback } from 'react';

const Mode = () => ({
  mode: null,
  contentId: 0
});
const ModeContext = createContext(Mode());

const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(Mode());

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModeContext.Provider value={{ ...mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
export { ModeContextProvider, ModeContext };
