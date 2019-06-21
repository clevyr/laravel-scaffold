import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';
import NotFound from './views/NotFound';
import Welcome from './views/Welcome';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Home from './views/Home';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',

    linkActiveClass: 'font-bold',

    routes: [
        {
            path: '*',
            component: NotFound
        },

        {
            path: '/',
            component: Welcome
        },

        {
            path: '/login',
            component: Login,
            meta: {
                guest: true,
            },
        },

        {
            path: '/register',
            component: Register,
            meta: {
                guest: true,
            },
        },

        {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true,
            },
        },
    ]
});

router.beforeEach(async (to, from, next) => {
    if (store.state.auth.isAuth && !store.state.auth.user) {
        await store.dispatch('auth/refreshUser/sendRequest');
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.auth.isAuth) {
            return next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.state.auth.isAuth) {
            return next({ path: '/home' });
        }
    }

    if (to.matched.some(record => record.meta.notVerified)) {
        if (!!store.state.auth.user.verifiedAt) {
            return next({ path: '/home' });
        }
    } else if (to.matched.some(record => record.meta.verified)) {
        if (!store.state.auth.user.verifiedAt) {
            return next({ path: '/email/resend' });
        }
    }

    return next();
});

export default router;
