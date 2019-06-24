import _ from 'lodash';

import {
    STATE_PRE, STATE_FAIL, STATE_SUCCESS, STATE_IN_PROGRESS,
} from '../constants/requestStates';

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

        clearValidationError(state, field) {
            if (state.error && state.error.errors) {
                delete state.error.errors[field];
            }
        },

        reset(state) {
            state.requestState = STATE_PRE;
            state.data = null;
            state.error = null;
        },
    },

    getters: {
        getValidationError: state => field => _.get(state, `error.errors.${field}[0]`),
        hasValidationError: state => field => _.has(state, `error.errors.${field}[0]`),
        successful: state => state.requestState === STATE_SUCCESS,
        failed: state => state.requestState === STATE_FAIL,
        inProgress: state => state.requestState === STATE_IN_PROGRESS,
    },

    actions: {
        sendRequest({ commit }) {
            const notOverwrittenError = new Error('The makeRequest function must be overwritten');

            commit('setRequestState', STATE_FAIL);
            commit('setError', notOverwrittenError);

            throw notOverwrittenError;
        },
    },
};
