import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { useLoginMutation } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login(formFields).unwrap();
      dispatch(setCredentials({ ...user }));
      navigate(redirect);
    } catch (err: unknown) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email..."
            value={formFields.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formFields.password}
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button disabled={isLoading} type="submit" variant="primary">
          Login
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/users/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
