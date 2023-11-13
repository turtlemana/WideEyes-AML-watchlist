import React, {useState,useEffect, createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { safeLocalStorageGet,safeLocalStorageRemove,safeLocalStorageSet } from 'utils/safeLocalStorage';


export type State = {
    email:string;
};

export type Action = 
  | { type: 'SET_EMAIL', email: string }
  | { type: 'RESET' };


type UserContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export let initialEmail: State = {
    email:"",
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
        safeLocalStorageSet('email', action.email);
      return {
       email:action.email,

      };
      case 'RESET':
        safeLocalStorageRemove('email');  
        return {email:""};
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [storedEmail, setStoredEmail] = useState(""); 
    useEffect(() => {
      const emailFromLocalStorage = safeLocalStorageGet('email') || "";
      setStoredEmail(emailFromLocalStorage);
    }, []);
    const initialEmailValue = { email: storedEmail };
    const [state, dispatch] = useReducer(reducer, initialEmailValue);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useEmail = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('userEmail must be within UserProvider');
  }
  return context;
};