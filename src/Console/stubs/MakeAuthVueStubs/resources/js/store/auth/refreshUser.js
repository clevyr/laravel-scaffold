import axios from 'axios';
import { defaultsDeep } from 'lodash';

import baseRequestStore from '../baseRequestStore';
import { STATE_IN_PROGRESS, STATE_SUCCESS, STATE_FAIL } from '../../constants/requestStates';

export default defaultsDeep({
    actions: {
        async sendRequest({ commit }) {
            commit('reset');
            commit('setRequestState', STATE_IN_PROGRESS);

            try {
                const response = await axios.get('/api/user');

                commit('setRequestState', STATE_SUCCESS);
                commit('setData', response.data);
                commit('auth/setUser', response.data, { root: true });
            } catch (error) {
                commit('setRequestState', STATE_FAIL);
                commit('setError', error.response.data);
                commit('auth/clearUser', null, { root: true });
            }
        },
    }
}, baseRequestStore);
