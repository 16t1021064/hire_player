import { FC } from "react";
import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";

const ResetPassword: FC = () => {
  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="login">
            <div className="login__container">
              <div className="login__form">
                <div className="login__title h3">Reset Password</div>
                <div className="login__line">
                  <a href="" className="login__link">
                    Back to login
                  </a>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
