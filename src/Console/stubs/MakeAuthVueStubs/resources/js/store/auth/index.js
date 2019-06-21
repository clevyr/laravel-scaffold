import login from './login';
import register from './register';
import logout from './logout';
import refreshUser from './refreshUser';

const isAuth = !!document.head.querySelector('meta[name="is-auth"]');

export default {
    namespaced: true,

    modules: {
        login,
        register,
        logout,
        refreshUser,
    },

    state: {
        isAuth: isAuth,
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
        }
    },
}
