import { STATE_PRE } from '../constants/requestStates';

export default {
    namespaced: true,

    state: {
        requestState: STATE_PRE,
        data: null,
        error: null,
    },

    mutations: {
        setRequestState(state, requestState) {
            state.requestState = requestState;
        },

        setData(state, data) {
            state.data = data;
        },

        setError(state, error) {
            state.error = error;
        },

        reset(state) {
            state.requestState = STATE_PRE;
            state.data = null;
            state.error = null;
        },
    },

    getters: {
        validationError: (state) => (prop) => {
            return state.error && state.error.errors && state.error.errors[prop] && state.error.errors[prop][0];
        }
    },

    actions: {
        sendRequest({ commit }) {
            const notOverwrittenError = new Error('The makeRequest function must be overwritten');

            commit('setRequestState', STATE_FAIL);
            commit('setError', notOverwrittenError);

            throw notOverwrittenError;
        },
    }
}
