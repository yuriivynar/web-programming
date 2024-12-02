import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage  from '../CheckoutPage/ErrorMessage.js';
import './Login.css';
import DocumentTitle from '../../components/helmet/document_title.js';
import { useDispatch } from 'react-redux';
import { setToken, login, getCart } from '../../utils/auth.js';
import { setCart } from '../../redux/CartSlice.js';

function Login() {
  DocumentTitle('Login');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email address')
    .required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
  });

  return (
    <div className='login'>
      <h2>Submit the form to sign in</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const { token } = await login(values);
            setToken(token);
            const userCart = await getCart();
            dispatch(setCart(userCart.items));
            navigate('/home');
          } catch (error) {
            console.error('Login error:', error);
            alert('Invalid email or password');
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='login__form'>
              <div>
                <p htmlFor="email">E-mail</p>
                <Field name="email" type="email" />
             </div>
              <div>
                <p htmlFor="password">Password</p>
                <Field name="password" type="password" />
              </div>
              <ErrorMessage errors={errors} touched={touched} />
              <div className='already_regist'>
                <p>Not registered?</p>
                <Link to="/register">Sign up</Link>
              </div>
              <div className='register__button'>
                <button type="submit">Sign in</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;