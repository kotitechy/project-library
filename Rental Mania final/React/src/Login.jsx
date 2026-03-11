
import { useNavigate} from 'react-router-dom';

import './ls.css';

import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import backend_url from './sec';
const Login = () => {

      const navigate = useNavigate();
      const [name,setName]  = useState('');
      const [passwd, setPasswd]   = useState('');
      function forgot(){
        navigate('/forgotpass')
      }
      async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const response = await fetch(`${backend_url}/login`, {
          method: 'POST',
          body: data,
        });
        const result = await response.json();
        // console.log(result);

        }
  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form className="login-form" method="POST" onSubmit={handleSubmit}>
            <input name='name' type="text" placeholder="USERNAME" onChange={(e)=>setName(e.target.value)} />
            <input  name='passwd' type="password" placeholder="PASSWORD" onChange={(e)=>setPasswd(e.target.value)} />
            <button className="opacity" type="submit">SUBMIT</button>
          </form>
          <div className="register-forget opacity">
            <a href="/register">REGISTER</a>
            <Link to ='/forgot'>FORGOT PASSWORD</Link>
          </div>
        </div>
        <div className="circle circle-two"></div>
        <div className="theme-btn-container"></div>
      </div>
    </section>
  );
};

export default Login;
