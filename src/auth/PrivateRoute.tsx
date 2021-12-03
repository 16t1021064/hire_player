import { useAppSelector } from "hooks/useRedux";
import { Link, Route } from "react-router-dom";
import LoadingFullpage from "components/LoadingFullpage";
import { routesEnum } from "pages/Routes";

const PrivateRoute = ({ component, ...args }: any) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  const tip = (
    <span>
      You have to <Link to={routesEnum.login}>login</Link> to access this page
    </span>
  );

  return isLogin ? (
    <Route component={component} {...args} />
  ) : (
    <LoadingFullpage tip={tip} />
  );
};

export default PrivateRoute;
