import { Outlet } from 'react-router';
import { AdminRoute } from '../admin/AdminRoute';

export const AdminLayout = (): JSX.Element => {
  return (
    <div>
      <AdminRoute>
        <Outlet />
      </AdminRoute>
    </div>
  );
};
