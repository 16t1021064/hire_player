import { useAppSelector } from "hooks/useRedux";
import { Route } from "react-router-dom";
import LoadingFullpage from "components/LoadingFullpage";
import { useHistory } from "react-router";
import { MouseEvent } from "react";

const AnonymousRoute = ({ component, ...args }: any) => {
  const { isLogin } = useAppSelector((state) => state.auth);
  const history = useHistory();

  const onGoBack = (e: MouseEvent) => {
    e.preventDefault();
    history.goBack();
  };

  const tip = (
    <span>
      Forbidden, <a onClick={onGoBack}>go back</a>
    </span>
  );
  return !isLogin ? (
    <Route component={component} {...args} />
  ) : (
    <LoadingFullpage tip={tip} />
  );
};

export default AnonymousRoute;
