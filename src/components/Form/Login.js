import React, { useContext, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';

const Loginform = () => {
    let navigate = useNavigate();
  
    const [ dispatch] = useContext(UserContext);
  
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      email: '',
      password: '',
    });
  
    const { email, password } = form;
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        // Data body
        const body = JSON.stringify(form);
  
        // Insert data for login process
        const response = await API.post('/login', body, config);
        console.log(response);

  
        // Checking process
        if (response?.status === 200) {
          // Send data to useContext
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data.data.user
          });
  
          // Status check
          if (response.data.data.user.status === 'admin') {
            navigate('/add-product');
          } else {
            navigate('/');
          }
  
          const alert = (
            <Alert variant="success" className="py-1">
              Login success
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Login failed
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    });
  return (
    <div className="d-flex justify-content-center">
      <Card bg='dark' className="p-4">
        <div
          style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }}
          className="mb-2 sub-headline"
        >
          Login
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant='danger py-2'>
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Loginform
