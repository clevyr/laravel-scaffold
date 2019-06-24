import axios from 'axios';
import { defaultsDeep } from 'lodash';
import { camelize, decamelize } from '@ridi/object-case-converter';

import baseRequestStore from '../baseRequestStore';
import { STATE_IN_PROGRESS, STATE_SUCCESS, STATE_FAIL } from '../../constants/requestStates';

export default defaultsDeep({
    actions: {
        async sendRequest({ commit }, formData) {
            commit('reset');
            commit('setRequestState', STATE_IN_PROGRESS);

            try {
                const response = await axios.post('/api/register', decamelize(formData));
                const camelized = camelize(response.data);

                commit('setRequestState', STATE_SUCCESS);
                commit('setData', camelized);
                commit('auth/setUser', camelized, { root: true });
            } catch (error) {
                commit('setRequestState', STATE_FAIL);
                commit('setError', camelize(error.response.data));
            }
        },
    },
}, baseRequestStore);
