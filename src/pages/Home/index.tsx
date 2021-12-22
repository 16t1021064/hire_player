import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__form">
          <div className="login__title h3">Sign in</div>
          <div className="login__line">
            <div className="login__text">New user?</div>
            <a className="login__link" href="#">
              Create an account
            </a>
          </div>
          <div className="field">
            <div className="field__label">Usename or email</div>
            <div className="field__wrap">
              <input className="field__input" type="email" />
            </div>
          </div>
          <div className="field">
            <div className="field__label">Password</div>
            <div className="field__wrap">
              <input className="field__input" type="password" />
            </div>
          </div>
          <button className="login__btn btn btn_primary btn_wide">
            Continue
          </button>
          <div className="login__or">Or continue with</div>
          <button className="login__btn btn btn_blue btn_wide">Google</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
