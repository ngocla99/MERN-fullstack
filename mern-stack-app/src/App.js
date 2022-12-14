import React, { Fragment, useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import Users from './user/pages/Users';
import { AuthContext } from './shared/context/auth-context';
import Develop from './develop/Develop';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Route path='/' element={<Users />} exact='true' />
        <Route path='/:userId/places' element={<UserPlaces exact='true' />} />
        <Route path='/places/new' element={<NewPlace />} exact='true' />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
        <Route path='*' element={<Users />} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path='/' element={<Users />} exact='true' />
        <Route path='/auth' element={<Auth />} />
        <Route path='/:userId/places' element={<UserPlaces exact='true' />} />
        <Route path='/dev' element={<Develop />} />
        <Route path='*' element={<Auth />} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
