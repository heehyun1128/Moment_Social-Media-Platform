import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const handleEnterKeyDown = e => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        if (!email || !password) {
          alert('Email and password are required for login!')
        }else{

          e.preventDefault();
          handleSubmit(e)
        }
      }
    };
    document.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      document.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [email,password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoUserLogin = (e) => {
    e.preventDefault()
    setErrors({});
    return dispatch(login('demo@aa.io', 'password'))
      .then(closeModal)

  }
  return (
    <div id='login-modal'>
      <h1>LOG IN</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="login-form-submit-btn" onClick={handleDemoUserLogin}>DEMO USER</button>
        <button className="login-form-submit-btn" type="submit">LOG IN</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
