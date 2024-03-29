import { Navigate, Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../components';
import { useAuth } from '../hooks';
import PacmanLoader from 'react-spinners/PacmanLoader';

const PrivateRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return <PacmanLoader color='#36d7b7' />;

  return (
    <>
      {auth._id ? (
        <div className='bg-gray-100'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main className='p-10 flex-1'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default PrivateRoute;
