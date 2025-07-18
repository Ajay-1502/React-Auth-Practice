import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userLoggedIn = !!token;

  useEffect(() => {
    const storedLogin = localStorage.getItem('user');
    if (storedLogin) {
      setToken(storedLogin);
    }
  }, []);

  const loginHandler = (token) => {
    localStorage.setItem('user', token);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    setToken(null);
  };

  const ContextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
