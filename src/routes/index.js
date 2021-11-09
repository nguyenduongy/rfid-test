import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// home
const Dashboard = React.lazy(() => import('../pages/home'));
// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
//user
const UserTable   = React.lazy(() => import('../pages/User/user'));
//organization
const OrganizationTable = React.lazy(() => import('../pages/Orgranization/organization'));
//Activity
const ActivityTable   = React.lazy(() => import('../pages/Activity/activity'));
//Detail
const DetailTable   = React.lazy(() => import('../pages/Detail/detail'));
//Admin
const AdminTable   = React.lazy(() => import('../pages/Admin/admin'));
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
    route: PrivateRoute,
};

// dashboards
const homeRoutes = {
    path: '/home',
    name: 'Home',
    icon: FeatherIcon.Home,
    header: 'Home',
    component: Dashboard,
    roles: ['Admin'],
    route: PrivateRoute,
};

// Card

const CardRoutes = {
    path: '/card',
    name: 'Card',
    header: 'Card',
    icon: FeatherIcon.Calendar,
    component: CalendarApp,
    route: PrivateRoute,
    roles: ['Admin'],
};
//User
const userTableRout = {
    path: '/User',
    name: 'User',
    header: 'User',
    icon: FeatherIcon.Inbox,
    component:  UserTable,
    route: PrivateRoute,
    roles: ['Admin'],
    
};
//Organization
const OrganizationRoutes = {
    path: '/Organization',
    name: 'Organization',
    header: 'Organization',
    icon: FeatherIcon.Briefcase,
    component: OrganizationTable,
    route: PrivateRoute,
    roles: ['Admin'],
};

const ActivityRoutes = {
    path: '/Activity',
    name: 'Activity',
    header: 'Activity',
    icon: FeatherIcon.Bookmark,
    component: ActivityTable,
    route: PrivateRoute,
    roles: ['Admin'],
};
// Detail 

const DetailRoutes = {
    path: '/Detail',
    name: 'Detail',
    header: 'Detail',
    icon: FeatherIcon.Bookmark,
    component: DetailTable,
    route: PrivateRoute,
    roles: ['Admin'],
};
// Admin
const AdminRoutes = {
    path: '/Admin',
    name: 'Admin',
    header: 'Admin',
    icon: FeatherIcon.Package,
    component: AdminTable,
    route: PrivateRoute,
    roles: ['Admin'],
};
const appRoutes = [CardRoutes, userTableRout, OrganizationRoutes, ActivityRoutes,AdminRoutes,DetailRoutes];

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    homeRoutes,
  //  demoRoutes,
    ...appRoutes,
    authRoutes,
];

const authProtectedRoutes = [
    homeRoutes,
  //  demoRoutes,
    ...appRoutes,
    
];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
