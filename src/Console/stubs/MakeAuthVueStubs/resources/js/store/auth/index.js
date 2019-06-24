import register from './register';
import login from './login';
import logout from './logout';
import passwords from './passwords';
import refreshUser from './refreshUser';

const isAuth = !!document.head.querySelector('meta[name="is-auth"]');

export default {
    namespaced: true,

    modules: {
        register,
        login,
        logout,
        passwords,
        refreshUser,
    },

    state: {
        isAuth,
        user: null,
    },

    mutations: {
        setUser(state, user) {
            state.isAuth = true;
            state.user = user;
        },

        clearUser(state) {
            state.isAuth = false;
            state.user = null;
        },
    },
};
