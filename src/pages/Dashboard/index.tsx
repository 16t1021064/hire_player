import LoadingFullpage from "components/LoadingFullpage";
import { useAppSelector } from "hooks/useRedux";
import { FC } from "react";

const Dashboard: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo ? (
    <div className={"container"}>
      <p>Hi {userInfo.firstName + " " + userInfo.lastName} !</p>
    </div>
  ) : (
    <LoadingFullpage tip="Loading..." />
  );
};

export default Dashboard;
