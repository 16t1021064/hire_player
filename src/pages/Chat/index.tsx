import { FC } from "react";
import AvaTuong from "img/ava-tuong.jpeg";
import Player8 from "img/player-8.jpeg";
import IonIcon from "@reacticons/ionicons";
import Message from "components/Message";

const Chat: FC = () => {
  return (
    <div className="chat">
      <div className="chat__sidebar">
        <div className="chat__item active">
          <div
            className="chat__body"
            style={{
              display: "block",
            }}
          >
            <a href="" className="chat__line">
              <div className="ava ava_online">
                <img src={Player8} alt="" className="ava__pic" />
              </div>
              <div className="chat__details">
                <div className="chat__man">John Doe</div>
                <div className="chat__time">3m ago</div>
              </div>
            </a>
            <a href="" className="chat__line active">
              <div className="ava ava_online">
                <img src={AvaTuong} alt="" className="ava__pic" />
              </div>
              <div className="chat__details">
                <div className="chat__man">Tuong Nguyen</div>
                <div className="chat__time">12m ago</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="chat_messenger">
        <div className="chat_messenger__head">
          <div className="chat_messenger__title h6 mr-auto">Tuong Nguyen</div>
          <div className="chat__actions">
            <button className="chat__action chat__action__btn__back__chat">
              <IonIcon
                className="icon icon-arrow-back-outline"
                name="arrow-back-outline"
              />
            </button>
            <button className="chat__action">
              <IonIcon
                className="icon icon-settings-outline"
                name="settings-outline"
              />
            </button>
          </div>
        </div>
        <div className="chat_messenger__body">
          <div className="chat_messenger__list">
            <div className="chat_messenger__item">
              <div className="chat_messenger__ava">
                <img src={Player8} alt="" className="chat_messenger__pic" />
              </div>
              <div className="chat_messenger__details">
                <div className="chat_messenger__top">
                  <div className="chat_messenger__man">John Doe</div>
                  <div className="chat_messenger__time">1m</div>
                </div>
                <div className="chat_messenger__group">
                  <Message text="Hey Hello" />
                </div>
              </div>
            </div>
            <div className="chat_messenger__item">
              <div className="chat_messenger__ava">
                <img src={AvaTuong} alt="" className="chat_messenger__pic" />
              </div>
              <div className="chat_messenger__details">
                <div className="chat_messenger__top">
                  <div className="chat_messenger__man">Tuong Nguyen</div>
                  <div className="chat_messenger__time">1m</div>
                </div>
                <div className="chat_messenger__group">
                  <Message text="Great!" />
                </div>
              </div>
            </div>
            <div className="chat_messenger__item">
              <div className="chat_messenger__ava">
                <img src={Player8} alt="" className="chat_messenger__pic" />
              </div>
              <div className="chat_messenger__details">
                <div className="chat_messenger__top">
                  <div className="chat_messenger__man">John Doe</div>
                  <div className="chat_messenger__time">1m</div>
                </div>
                <div className="chat_messenger__group">
                  <Message text="Hey Hello" />
                </div>
              </div>
            </div>
            <div className="chat_messenger__item">
              <div className="chat_messenger__ava">
                <img src={AvaTuong} alt="" className="chat_messenger__pic" />
              </div>
              <div className="chat_messenger__details">
                <div className="chat_messenger__top">
                  <div className="chat_messenger__man">Tuong Nguyen</div>
                  <div className="chat_messenger__time">1m</div>
                </div>
                <div className="chat_messenger__group">
                  <Message text="'Great!"></Message>
                  <Message text="'Ok bro!"></Message>
                  <Message text="'Great bro!"></Message>
                </div>
              </div>
            </div>
          </div>
          <div className="chat_messenger__foot">
            <input
              type="text"
              placeholder="Send a message…"
              className="chat_messenger__input"
            />
            <button className="chat_messenger__btn btn btn_primary">
              Send
            </button>
            <button className="chat_messenger__smile">
              <IonIcon
                className="icon icon-happy-outline"
                name="happy-outline"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
