let toastId = 1;

export default {
    namespaced: true,

    state: {
        toasts: [],
    },

    mutations: {
        addToast(state, toast) {
            if (!toast.id) toast.id = toastId++;
            state.toasts.push(toast);
        },

        removeToast(state, toastId) {
            const index = state.toasts.findIndex((toast) => toast.id === toastId);
            if (index !== -1) state.toasts.splice(index, 1);
        },

        clearToasts(state) {
            state.toasts = [];
        },
    },

    actions: {
        addTimedToast({ commit }, toast) {
            if (!toast.id) toast.id = toastId++;
            commit('addToast', toast);
            setTimeout(() => {
                commit('removeToast', toast.id);
            }, 5000);
        }
    }
}
