import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { useProfileMutation } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';

type CustomError = {
  data?: {
    message?: string;
  };
  error?: string;
};

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useProfileMutation();

  const { userInfo } = useAppSelector(state => state.auth);

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setFormFields({
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [navigate, userInfo]);

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
        const user = await updateProfile({
          name: formFields.name,
          email: formFields.email,
          password: formFields.password,
        }).unwrap();
        dispatch(setCredentials({ ...user }));
        toast.success('Profile Updated Successfully');
      } catch (err) {
        const error = err as CustomError;

        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>{`${userInfo.name}'s Profile`}</h1>
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
              type="password"
              value={formFields.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </Form.Group>
          <Button disabled={isLoading} type="submit" variant="primary">
            Update Profile
          </Button>
          {isLoading && <Loader />}
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
