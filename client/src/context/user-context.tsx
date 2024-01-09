import  { createContext, useState } from 'react';

interface UserInterface {
  currentUser: object | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<object | null>>;
  tokenInfo: string | null;
  setTokenInfo: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

/**
  The value you want to pass to the provider. This values
  will be available to all components that are children of
  the provider component. You set the default value in the
  createContext method.
*/
export const UserContext = createContext<UserInterface>({
  currentUser: null,
  setCurrentUser: () => null,
  tokenInfo: null,
  setTokenInfo: () => null,
  isLoggedIn: null,
  setIsLoggedIn: () => null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

/**
  The provider component which will wrap the entire app.
  This will make the values you pass to the provider
  available to all the components in the app.


*/
export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const [tokenInfo, setTokenInfo] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  /**
    The value you want to pass to the provider. This values will be available to all components that are children of the provider component.

    You set the default value in the createContext method.

    This value and the value in the provider component must match.
   */
  const value: UserInterface = { 
    currentUser, 
    setCurrentUser,
    tokenInfo,
    setTokenInfo, 
    isLoggedIn,
    setIsLoggedIn,
  };
  
  return (
  <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
);
};