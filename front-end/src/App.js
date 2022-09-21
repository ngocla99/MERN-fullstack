import React, { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Develop from './develop/Develop';
// // import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
// import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

function App() {
    const { token, userId, login, logout } = useAuth();
    let routes;
    if (token) {
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
                    isLoggedIn: !!token,
                    token: token,
                    userId: userId,
                    login: login,
                    logout: logout,
                }}
            >
                <MainNavigation />
                <main>
                    <Suspense
                        fallback={
                            <div className='center'>
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        <Routes>{routes}</Routes>
                    </Suspense>
                </main>
            </AuthContext.Provider>
        </Fragment>
    );
}

export default App;
