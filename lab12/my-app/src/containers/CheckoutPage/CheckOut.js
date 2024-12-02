import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import ErrorMessage from './ErrorMessage.js';
import DocumentTitle from '../../components/helmet/document_title.js';
import './CheckOut.css';
import { useDispatch } from 'react-redux';
import { setCart } from '../../redux/CartSlice.js';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[a-zA-Z]+$/, 'First Name can only contain letters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z]+$/, 'Last Name can only contain letters'),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^[0-9]+$/, 'Phone can only contain numbers')
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone must be at most 15 digits'),
  address: Yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Address cannot contain special characters'),
});

function CheckOut() {
  DocumentTitle('CheckOut');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
      <div className='checkout'>
        <h1 className='checkout__title'>Check Out</h1>
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', phone: '', address: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              try {
                localStorage.removeItem('cart');
                dispatch(setCart([]));
                navigate('/success');
              } catch (error) {
                console.error('Failed to clear cart:', error);
              } finally {
                setSubmitting(false);
              }
            }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='checkout__form'>
                <div className='checkout__form-name'>
                  <div className='checkout__form-first-name'>
                    <p>First Name</p>
                    <Field name="firstName" type="text" />
                  </div>
                  <div className='checkout__form-last-name'>
                    <p>Last Name</p>
                    <Field name="lastName" type="text" />
                  </div>
                </div>
                <div className='checkout__form-email-phone'>
                  <div className='checkout__form-email'>
                    <p>Email</p>
                    <Field name="email" type="email" />
                  </div>
                  <div className='checkout__form-phone'>
                    <p>Phone</p>
                    <Field name="phone" type="text" />
                  </div>
                </div>
                <div className='checkout__form-address'>
                  <p>Address</p>
                  <Field name="address" type="text" />
                </div>
              </div>
              <ErrorMessage errors={errors} touched={touched} onClose={() => {}} />
              <div className='checkout__buttons'>
                <Link to="/cart">
                  <button className='go_back_button' type="button">Go Back</button>
                </Link>
                <button className='continue__button' type="submit">Continue</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
  );
}

export default CheckOut;