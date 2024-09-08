import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal} from '../../context/Modal'
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
          setErrors({ 'EmPwValidationErr': 'Email and password are required for login!' });
          e.preventDefault();
          return
        }else{

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
    return dispatch(login('demo@aa.io', 'Password123'))
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
        {errors && errors.email &&
          <p className="errors">{errors.email}</p>
        }
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors && errors.password &&
          <p className="errors">{errors.password}</p>
        }
        {errors && errors.EmPwValidationErr &&
          <p className="errors">{errors.EmPwValidationErr}</p>
        }
        <button className="login-form-submit-btn demo" onClick={handleDemoUserLogin}>DEMO USER LOGIN</button>
        <button className="login-form-submit-btn" type="submit">LOG IN</button>
      </form>
    </div>

    
  );
}

export default LoginFormModal;
