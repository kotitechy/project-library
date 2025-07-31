
import { useNavigate } from 'react-router-dom';
import './ls.css';

    import { Outlet, Link } from 'react-router-dom';
const Login = () => {
      const navigate = useNavigate();
      function forgot(){
        navigate('/forgotpass')
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
          <form>
            <input type="text" placeholder="USERNAME" />
            <input type="password" placeholder="PASSWORD" />
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
