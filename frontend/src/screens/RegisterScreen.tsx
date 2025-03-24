import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { useRegisterMutation } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

type CustomError = {
  data?: {
    message?: string;
  };
  error?: string;
};

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useAppSelector(state => state.auth);

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formFields.password !== formFields.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const user = await register(formFields).unwrap();
        dispatch(setCredentials({ ...user }));
        navigate(redirect);
      } catch (err) {
        const error = err as CustomError;

        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name..."
            value={formFields.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="confirmPassword"
            value={formFields.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </Form.Group>
        <Button disabled={isLoading} type="submit" variant="primary">
          Register
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3">
          <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
