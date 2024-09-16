import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Spots from './components/Spots/Spots';
import Reviews from './components/Reviews/Reviews'
import SpotDetail from './components/Spots/SpotDetail';
import CreateSpot from './components/Spots/CreateSpot';
import ManageSpot from './components/Spots/ManageSpots';
import UpdateSpot from './components/Spots/UpdateSpot';
import { Navigate } from 'react-router-dom';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />,
      },
      {
        path: '/current',
        element: <ManageSpot />
      },
      {
        path: '/spots/:spotId/reviews',
        element: <Reviews />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      },
      {
        path: '/spots/:spotid/edit',
        element: <UpdateSpot />
      },
      {
        path: '*',
        element: <Navigate to='/' replace={true} />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
