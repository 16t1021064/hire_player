import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { settingHireRequest } from "api/players/request";
import { useMutation } from "react-query";
import { setUserInfo } from "store/ducks/auth/slice";
import Button from "components/Button";
import { notifySuccess } from "utils/notify";

const PlayerHire: FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const enableHireRef = useRef<HTMLInputElement>(null);
  const maxHoursRef = useRef<HTMLSelectElement>(null);
  const [hours, setHours] = useState<number[]>([]);

  useEffect(() => {
    setHours(userInfo?.playerInfo?.timeReceiveHire || []);
  }, [userInfo]);

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>, h: number) => {
    const newHours = [...hours];
    const index = newHours.findIndex((hour) => hour === h);
    if (e.target.checked && index < 0) {
      newHours.push(h);
    } else if (!e.target.checked && index >= 0) {
      newHours.splice(index, 1);
    }
    setHours(newHours);
  };

  const { mutate: settingHire, status: settingHireStatus } = useMutation(
    settingHireRequest,
    {
      onSuccess: (data) => {
        dispatch(setUserInfo(data.data));
        notifySuccess("Update success");
      },
    }
  );

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      userInfo &&
      settingHireStatus !== "loading" &&
      enableHireRef.current &&
      maxHoursRef.current?.value
    ) {
      settingHire({
        id: userInfo.id,
        isReceiveHire: enableHireRef.current.checked,
        timeMaxHire: parseInt(maxHoursRef.current.value),
        timeReceiveHire: hours,
      });
    }
  };

  return (
    <SettingsLayout>
      <form className="setting__form" onSubmit={onSubmit}>
        <div className="setting__title h5">Setting Hire</div>
        <div className="setting__field field">
          <div className="field__label field__label__inline">
            <span className="h6">You Want To Receive Hire Rental Request:</span>
            <label className="checkbox">
              <input
                className="checkbox__input"
                type="checkbox"
                defaultChecked={
                  userInfo?.playerInfo?.isReceiveHire ? true : false
                }
                ref={enableHireRef}
              />
              <span className="checkbox__in">
                <span className="checkbox__tick"></span>
              </span>
            </label>
          </div>
        </div>
        <div className="setting__field field">
          <div className="field__label">Time Frame For Receiving The Hire:</div>
        </div>
        <div className="setting__row__wrap">
          {Array.from(Array(24).keys()).map((num) => (
            <div key={num} className="setting__row__wrap__field">
              <label className="checkbox">
                <input
                  className="checkbox__input"
                  type="checkbox"
                  checked={hours.includes(num + 1)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChangeHour(e, num + 1);
                  }}
                />
                <span className="checkbox__in">
                  <span className="checkbox__tick"></span>
                </span>
              </label>
              <span>{num + 1}:00</span>
            </div>
          ))}
        </div>
        <div className="setting__row">
          <div className="setting__field field">
            <div className="field__label">
              Maximum hours can hire in one time:
            </div>
            <div className="field__wrap">
              <select
                className="field__select"
                defaultValue={userInfo?.playerInfo?.timeMaxHire || 1}
                ref={maxHoursRef}
              >
                {Array.from(Array(24).keys()).map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1} hour
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Button className="popup__btn" type="primary" htmlType="submit">
          Update
        </Button>
      </form>
    </SettingsLayout>
  );
};

export default PlayerHire;
