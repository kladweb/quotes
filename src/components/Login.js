import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import * as formik from 'formik';
import * as yup from 'yup';

function Login() {

  const {Formik} = formik;
  const schema = yup.object().shape({
    myName: yup.string()
      .email('Неправильный email!')
      .required('Обязательное поле!')
      .matches(/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, 'Неправильный email!'),
    pass: yup.string().required().min(8, "Минимум 8 символов!"),
  });

  function authEmail(name, pass) {
    const auth = getAuth();
    console.log(name);
    console.log(pass);
    createUserWithEmailAndPassword(auth, name, pass)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user);
        sendVerifMail(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function sendVerifMail(auth) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
        console.log('Отправлено письмо для подтверждения!');
      });
  }

  const handleSend = (event, err) => {
    const form = event.currentTarget;
    const name = form.parentNode.myName;
    const pass = form.parentNode.pass;
    console.log(Object.keys(err).length);
    if (Object.keys(err).length === 0) {
      authEmail(name.value, pass.value);
    } else {

    }

    // console.log(name.value);
    // console.log(pass.value);
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setValidated(true);
    // const formData = new FormData(form);
    // const name = formData.get('name');
    // const pass = formData.get('pass');

    // authEmail(name.value, pass.value);
  };

  return (
    <Container>
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          myName: '',
          pass: '',
        }}
      >
        {({handleSubmit, handleChange, values, touched, errors}) => (
          <Form className="pt-5" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3 position-relative" controlId="validationFormik101">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="myName"
                type="text"
                value={values.myName}
                onChange={handleChange}
                placeholder="Enter email"
                isValid={!touched.myName && values.myName}
                isInvalid={!!errors.myName}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.myName}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 position-relative" controlId="validationCustomPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="pass"
                type="password"
                placeholder="Password"
                value={values.pass}
                onChange={handleChange}
                isValid={!touched.pass && values.pass}
                isInvalid={!!errors.pass}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.pass}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="info" className='text-light' type="submit" onClick={(e) => {
              handleSend(e, errors);
            }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;