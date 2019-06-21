import Vue from 'vue';

import store from './store';
import router from './router';
import './bootstrap';

const files = require.context('./components', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    el: '#app',
    store,
    router,
});
