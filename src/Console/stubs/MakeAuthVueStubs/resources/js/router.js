import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';
import NotFound from './views/NotFound.vue';
import Welcome from './views/Welcome.vue';
import Home from './views/Home.vue';
import Register from './views/auth/Register.vue';
import Login from './views/auth/Login.vue';
import Verify from './views/auth/Verify.vue';
import PasswordEmail from './views/auth/passwords/Email.vue';
import PasswordReset from './views/auth/passwords/Reset.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',

    linkActiveClass: 'font-bold',

    routes: [
        {
            path: '*',
            component: NotFound,
        },

        {
            path: '/',
            component: Welcome,
        },

        {
            path: '/home',
            component: Home,
            meta: {
                auth: true,
                verified: true,
            },
        },

        {
            path: '/register',
            component: Register,
            meta: {
                hideNavbar: true,
                notAuth: true,
            },
        },

        {
            path: '/login',
            component: Login,
            meta: {
                hideNavbar: true,
                notAuth: true,
            },
        },

        {
            path: '/email/resend',
            component: Verify,
            meta: {
                auth: true,
                notVerified: true,
            },
        },

        {
            path: '/password/email',
            component: PasswordEmail,
            meta: {
                notAuth: true,
            },
        },

        {
            path: '/password/reset/:token',
            component: PasswordReset,
            meta: {
                notAuth: true,
            },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (store.state.auth.isAuth && !store.state.auth.user) {
        await store.dispatch('auth/refreshUser/sendRequest');
    }

    if (to.matched.some(record => record.meta.auth)) {
        if (!store.state.auth.isAuth) {
            return next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        }
    } else if (to.matched.some(record => record.meta.notAuth)) {
        if (store.state.auth.isAuth) {
            return next({ path: '/home' });
        }
    }

    if (to.matched.some(record => record.meta.notVerified)) {
        if (store.state.auth.user.email_verified_at) {
            return next({ path: '/' });
        }
    } else if (to.matched.some(record => record.meta.verified)) {
        if (!store.state.auth.user.email_verified_at) {
            return next({ path: '/email/resend' });
        }
    }

    return next();
});

export default router;
