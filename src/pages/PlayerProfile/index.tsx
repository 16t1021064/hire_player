import { FC } from "react";
import styles from "./index.module.scss";

const PlayerProfile: FC = () => {
  return (
    <div className={styles.page}>
      <div className="author author_big">
        <div className="author__container">
          <div className="author__details">
            <div className="ava ava_online">
              <img className="ava__pic" src="img/ava-tuong.jpeg" alt="" />
            </div>
            <div className="author__wrap">
              <div className="author__man h2 confirm">Tuong Nguyen</div>
              <div className="author__parameters">
                <div className="author__parameter">
                  {" "}
                  <span>HAS BEEN HIRED</span>
                  <strong>3000 hour</strong>
                </div>
                <div className="author__parameter">
                  {" "}
                  <span>COMPLETION RATE </span>
                  <strong>93.67 %</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="author__btns">
            <a
              className="js-popup-open author__btn btn btn__small btn_primary"
              href="#popup-hire-player"
              data-effect="mfp-zoom-in"
            >
              <span className="btn__text">Hire</span>
            </a>
            <a
              className="js-popup-open author__btn btn btn__small btn_gray"
              href="#popup-donate-player"
              data-effect="mfp-zoom-in"
            >
              <span className="btn__text">Donate</span>
            </a>
            <a
              className="js-popup-open author__btn btn btn_gray btn_square"
              href="#popup-message-player"
              data-effect="mfp-zoom-in"
            >
              {/* <ion-icon
                className="icon icon-chatbubble-ellipses-outline"
                name="chatbubble-ellipses-outline"
              ></ion-icon> */}
            </a>
          </div>
        </div>
      </div>
      <div className="author__info__content">
        <div className="author__info__title h5">Information</div>
        <p>I can play LOL, CSGO, F04, Confidentiality, Support consulting</p>
        <p>
          <strong>Use: React grid photos:</strong>
          <a href="https://github.com/benhowell/react-grid-gallery">
            https://github.com/benhowell/react-grid-gallery
          </a>
        </p>
        <div className="author__info__photos">
          <img src="https://source.unsplash.com/BhcutpohYwg/800x800" />
          <img src="https://source.unsplash.com/j5KAuRrYX7g/800x800" />
          <img src="https://source.unsplash.com/pQyIutdScOY/800x800" />
          <img src="https://source.unsplash.com/55JRsxcAiWE/800x800" />
          <img src="https://source.unsplash.com/BhcutpohYwg/800x800" />
          <img src="https://source.unsplash.com/j5KAuRrYX7g/800x800" />
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
              <div className="ratings__item">
                <div className="ratings__ava">
                  <img
                    className="ratings__pic"
                    src="img/ava-tuong.jpeg"
                    alt=""
                  />
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
                    {/* <ion-icon className="icon icon-star" name="star"></ion-icon>
                    <ion-icon className="icon icon-star" name="star"></ion-icon>
                    <ion-icon className="icon icon-star" name="star"></ion-icon>
                    <ion-icon
                      className="icon icon-star-half-outline"
                      name="star-half-outline"
                    ></ion-icon> */}
                  </div>
                </div>
              </div>
              <div className="ratings__item">
                <div className="ratings__ava">
                  <img
                    className="ratings__pic"
                    src="img/ava-tuong.jpeg"
                    alt=""
                  />
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
                    {/* <ion-icon className="icon icon-star" name="star"></ion-icon>
                    <ion-icon className="icon icon-star" name="star"></ion-icon>
                    <ion-icon className="icon icon-star" name="star"></ion-icon>
                    <ion-icon
                      className="icon icon-star-half-outline"
                      name="star-half-outline"
                    ></ion-icon> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
