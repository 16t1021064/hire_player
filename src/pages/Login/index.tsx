import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";

const Login: FC = () => {
  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="login">
            <div className="login__container">
              <div className="login__form">
                <div className="login__title h3">Sign in</div>
                <div className="login__line">
                  <div className="login__text">New user?</div>
                  <a href="" className="login__link">
                    Create an account
                  </a>
                </div>
                <div className="field">
                  <div className="field__label">Usename or email</div>
                  <div className="field__wrap">
                    <input type="email" className="field__input" />
                  </div>
                </div>
                <div className="field">
                  <div className="field__label">Password</div>
                  <div className="field__wrap">
                    <input type="password" className="field__input" />
                  </div>
                </div>
                <button className="login__btn btn btn_primary btn_wide">
                  Continue
                </button>
                <div className="login__or">Or continue with</div>
                <button className="login__btn btn btn_blue btn_wide">
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
