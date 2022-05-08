import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';
import Router from './route/Router'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext)
  console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/admin-complain');
      }else if (state.user.status === 'customer'){
        navigate('/home')
      }
    }
  }, [state]);


  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
  
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      <Router />
    </div>
  )
}

export default App
