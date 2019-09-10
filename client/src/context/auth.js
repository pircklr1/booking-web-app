import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

// If you want to add new information to currentUser, you need to provide the data from the back to front, and
// then in login function in Login.js set that item to localStorage. If you add a new item to the front, remember
// also to handle its removal (both from initialization and logout).

const initialState = {
  currentUser: null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
    if (localStorage.getItem('userId')) {
      localStorage.removeItem('userId');
    }
    if (localStorage.getItem('userName')) {
      localStorage.removeItem('userName');
    }
  } else {
    initialState.currentUser = decodedToken;
  }
}

const AuthContext = createContext({
  currentUser: null,
  login: userData => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    // console.log(userData);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    dispatch({
      type: 'LOGOUT'
    });
  }

  return (
    <AuthContext.Provider
      value={{ currentUser: state.currentUser, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
