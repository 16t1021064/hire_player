import SimplePanel from "components/SimplePanel";
import { FC } from "react";
import Header from "./Header";
import styles from "./index.module.scss";

const PlayerProfile: FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <SimplePanel title={"Information"}>
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
      </SimplePanel>
      <SimplePanel title={"Rating"}>
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
      </SimplePanel>
    </div>
  );
};

export default PlayerProfile;
