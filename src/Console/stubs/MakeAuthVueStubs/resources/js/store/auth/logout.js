import axios from 'axios';
import { defaultsDeep } from 'lodash';

import baseRequestStore from '../baseRequestStore';
import { STATE_IN_PROGRESS, STATE_SUCCESS, STATE_FAIL } from '../../constants/requestStates';

export default defaultsDeep({
    actions: {
        async sendRequest({ commit }, formData) {
            commit('reset');
            commit('setRequestState', STATE_IN_PROGRESS);

            try {
                const response = await axios.post('/api/logout', formData);

                commit('setRequestState', STATE_SUCCESS);
                commit('setData', response.data);
                commit('auth/clearUser', null, { root: true });
            } catch (error) {
                commit('setRequestState', STATE_FAIL);
                commit('setError', error.response.data);
            }
        },
    },
}, baseRequestStore);
