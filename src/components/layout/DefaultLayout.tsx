import { Outlet } from 'react-router';
import { AuthRoute } from '../auth/AuthRotue';

export const DefaultLayout = (): JSX.Element => {
  return (
    <div>
      <AuthRoute>
        <Outlet />
      </AuthRoute>
    </div>
  );
};
