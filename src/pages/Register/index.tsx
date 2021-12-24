import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";

const Register: FC = () => {
  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="login">
            <div className="login__container">
              <div className="login__form">
                <div className="login__title h3">Sign up</div>
                <div className="login__line">
                  <div className="login__text">Already a user</div>
                  <a href="" className="login__link">
                    Login now
                  </a>
                </div>

                <div className="login__row">
                  <div className="login__col">
                    <div className="field">
                      <div className="field__label">First name</div>
                      <div className="field__wrap">
                        <input type="text" className="field__input" />
                      </div>
                    </div>
                  </div>
                  <div className="login__col">
                    <div className="field">
                      <div className="field__label">Last name</div>
                      <div className="field__wrap">
                        <input type="text" className="field__input" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field__label">Email Address</div>
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
                <div className="login__or">Sign up by Open ID</div>
                <button className="login__btn btn btn_blue btn_wide">
                  Google Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
