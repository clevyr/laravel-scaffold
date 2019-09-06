import axios from 'axios';
import { defaultsDeep } from 'lodash';
import { camelize, decamelize } from '@ridi/object-case-converter';

import baseRequestStore from '../../baseRequestStore';
import { STATE_IN_PROGRESS, STATE_SUCCESS, STATE_FAIL } from '../../../constants/requestStates';

export default defaultsDeep({
    actions: {
        async sendRequest({ commit }, formData) {
            commit('reset');
            commit('setRequestState', STATE_IN_PROGRESS);

            try {
                const response = await axios.post('/api/email/resend', decamelize(formData));

                commit('setRequestState', STATE_SUCCESS);
                commit('setData', camelize(response.data));
            } catch (error) {
                commit('setRequestState', STATE_FAIL);
                commit('setError', camelize(error.response.data));
            }
        },
    },
}, baseRequestStore);
