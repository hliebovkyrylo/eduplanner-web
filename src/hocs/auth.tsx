import { FC }              from 'react';
import { Navigate }        from 'react-router-dom';
import { useSelector }     from 'react-redux';
import { IAppState }       from '@redux/store';

export const auth = <Props extends object>(Component: FC<Props>) => (
  props: Props
) => {
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  if (accessToken === null) {
    return <Navigate to="/sign-in" />;
  }

  return <Component {...props} />;
};