import Vue from 'vue';
import Vuex from 'vuex';
import VCalendar from 'v-calendar';
import App from './App.vue';
import Store from './Store.js';

import 'v-calendar/lib/v-calendar.min.css';

Vue.use(Vuex);
Vue.use(VCalendar);

const store = new Vuex.Store(Store);

new Vue({
    el: '#app',
    store,
    render: h => h(App),
});
