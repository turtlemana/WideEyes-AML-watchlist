import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

export type State = Record<string, boolean>;

export type Action = 
  | { type: 'TOGGLE', id: string }
  | { type: 'RESET' };

type ToggleContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

const toggleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        [action.id]: !state[action.id],
      };
    case 'RESET':
      return {};
    default:
      return state;
  }
};

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(toggleReducer, {});

  return (
    <ToggleContext.Provider value={{ state, dispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = (): ToggleContextType => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};