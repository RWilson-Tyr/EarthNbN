import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  let [credential, setCredential] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.message) {
          setErrors({message : data.message.value});

        }
        return setErrors({
          InvalidCredentials: "The provided credentials were invalid"
        });
      });
  };

  const demoLogin = (e) => {
    e.preventDefault()
    credential = "Demo-lition"
    password = "password"
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
      </form>
      {errors.InvalidCredentials && (
        <p>{errors.InvalidCredentials}</p>
      )}
      <button type="demo" onClick={demoLogin}>
        Log in as Demo User
      </button>
    </>
  );
}

export default LoginFormModal;
