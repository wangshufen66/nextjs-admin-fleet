'use client';

import { authenticate } from 'app/lib/actions';
import styles from './loginForm.module.css';
import { useFormState } from 'react-dom';

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login Form </h1>
      {/* <input type="text" placeholder="username" name="username" /> */}
      <input type="text" placeholder="Email" name="Email" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
