import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Store from './Store.js';

Vue.use(Vuex);

const store = new Vuex.Store(Store);

new Vue({
    el: '#app',
    store,
    render: h => h(App),
});
