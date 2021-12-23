import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import AvaTuong from "img/ava-tuong.jpeg";

const Rating: FC = () => {
  return (
    <div className="ratings__item">
      <div className="ratings__ava">
        <img src={AvaTuong} alt="" className="ratings__pic" />
      </div>
      <div className="ratings__details">
        <div className="ratings__top">
          <div className="ratings__author">Tuong Nguyen</div>
          <div className="ratings__time">12h</div>
        </div>
        <div className="ratings__text">
          Amazing Player. Help me up rank.....
        </div>
        <div className="ratings__stars">
          <IonIcon className="icon icon-star" name="star" />
          <IonIcon className="icon icon-star" name="star" />
          <IonIcon className="icon icon-star" name="star" />
          <IonIcon
            className="icon icon-star-half-outline"
            name="star-half-outline"
          />
        </div>
      </div>
    </div>
  );
};

const PlayerProfile: FC = () => {
  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="page__center">
            <div className="author author_big">
              <div className="author__container">
                <div className="author__details">
                  <div className="ava ava_online">
                    <img src={AvaTuong} alt="" className="ava__pic" />
                  </div>
                  <div className="author__wrap">
                    <div className="author__man h2 confirm">Tuong Nguyen</div>
                    <div className="author__parameters">
                      <div className="author__parameter">
                        <span>HAS BEEN HIRED</span>
                        <strong>3000 hour</strong>
                      </div>
                      <div className="author__parameter">
                        <span>COMPLETION RATE </span>
                        <strong>93.67 %</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="author__btns">
                  <a
                    href="#popup-hire-player"
                    data-effect="mfp-zoom-in"
                    className="js-popup-open author__btn btn btn__small btn_primary"
                  >
                    <span className="btn__text">Hire</span>
                  </a>
                  <a
                    href="#popup-donate-player"
                    data-effect="mfp-zoom-in"
                    className="js-popup-open author__btn btn btn__small btn_gray"
                  >
                    <span className="btn__text">Donate</span>
                  </a>
                  <a
                    className="js-popup-open author__btn btn btn_gray btn_square"
                    href="#popup-message-player"
                    data-effect="mfp-zoom-in"
                  >
                    <IonIcon
                      className="icon icon-chatbubble-ellipses-outline"
                      name="chatbubble-ellipses-outline"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="author__info__content">
              <div className="author__info__title h5">Information</div>
              <p>
                I can play LOL, CSGO, F04, Confidentiality, Support consulting
              </p>
              <p>
                <strong>Use: React grid photos:</strong>
                <a href="https://github.com/benhowell/react-grid-gallery">
                  https://github.com/benhowell/react-grid-gallery
                </a>
              </p>
              <div className="author__info__photos">
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
                <img
                  src="https://source.unsplash.com/BhcutpohYwg/800x800"
                  alt=""
                />
              </div>
              <div className="author__info__des">
                <p>Rank-up with me</p>
                <p>Rank-up with me</p>
                <p>Rank-up with me</p>
                <p>Rank-up with me</p>
                <p>Rank-up with me</p>
                <p>Rank-up with me</p>
              </div>
              <div className="author__info__title h5">Rating</div>
              <div className="ratings__row">
                <div className="ratings__container">
                  <div className="ratings__list">
                    <Rating />
                    <Rating />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* popup Hire */}
          <div className="popup popup_normal mfp-hide" id="popup-hire-player">
            <form action="" className="popup__form">
              <div className="popup__title h5">Hire Player</div>
              <div className="popup__fieldset">
                <div className="popup__row">
                  <div className="popup__field field">
                    <div className="field__label">Player</div>
                    <div className="field__wrap"></div>
                    <span>Tuong Nguyen</span>
                  </div>
                  <div className="popup__field field">
                    <div className="field__label">Time to rent</div>
                    <div className="field__wrap">
                      <select name="" id="" className="field__select">
                        <option value="1 hour">1 hour</option>
                        <option value="2 hour">2 hour</option>
                        <option value="3 hour">3 hour</option>
                        <option value="4 hour">4 hour</option>
                        <option value="5 hour">5 hour</option>
                        <option value="6 hour">6 hour</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="popup__row">
                  <div className="popup__field field">
                    <div className="field__label">Cost</div>
                    <div className="field__wrap">
                      <span>$20</span>
                    </div>
                  </div>
                  <div className="popup__field field">
                    <div className="field__label">Current balance</div>
                    <div className="field__wrap">
                      <span>$50,00</span>
                    </div>
                  </div>
                </div>
                <div className="popup__field field">
                  <div className="field__label">Message</div>
                  <div className="field__wrap">
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      className="field__textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
              <button className="popup__btn btn btn_primary">Hire now</button>
            </form>
          </div>

          {/* popup donate */}
          <div className="popup popup_normal mfp-hide" id="popup-donate-player">
            <form action="" className="popup__form">
              <div className="popup__title h5">Donate Player</div>
              <div className="popup__fieldset">
                <div className="popup__row">
                  <div className="popup__field field">
                    <div className="field__label">Receiver</div>
                    <div className="field__wrap">
                      <span>Tuong Nguyen</span>
                    </div>
                  </div>
                  <div className="popup__field field">
                    <div className="field__label">The amount</div>
                    <div className="field__wrap">
                      <input type="text" className="field__input" />
                    </div>
                  </div>
                </div>
                <div className="popup__field field">
                  <div className="field__label">Message</div>
                  <div className="field__wrap">
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      className="field__textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
              <button className="popup__btn btn btn_primary">Donate now</button>
            </form>
          </div>

          {/* popup message */}
          <div
            className="popup popup_normal mfp-hide"
            id="popup-message-player"
          >
            <form action="" className="popup__form">
              <div className="popup__title h5">Send a message</div>
              <div className="popup__fieldset">
                <div className="popup__field field">
                  <div className="field__label">Message</div>
                  <div className="field__wrap">
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      className="field__textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
              <button className="popup__btn btn btn_primary">Send now</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlayerProfile;
