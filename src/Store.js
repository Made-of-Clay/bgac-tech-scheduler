import Vue from 'vue';
import { uniqid } from './utils';

export default {
    state: {
        techees: [/*{
            id: '123-123-123',
            name: 'Adam',
            unavailable: ['345-345-345']
        }*/],
        selectedID: '',
    },
    getters: {
        selectedTechee({selectedID, techees}) {
            if (!techees.length) return {};

            let [selected] = techees.filter(techee => techee.id === selectedID);

            return selected;
        }
    },
    actions: {
        addTechee({commit}, techeeName = '') {
            if (!techeeName) {
                console.warn('No techee name passed to add; doing nothing');
                return;
            }
            if (typeof techee !== 'string') {
                techeeName = `${techeeName}`;
            }
            commit('ADD_TECHEE', techeeName);
        },
        removeTechee({commit}, techeeID) {
            if (!techeeID) {
                console.warn('No techee ID passed to add; doing nothing');
                return;
            }
            commit('REMOVE_TECHEE', techeeID);
        },
        selectTechee({commit}, techeeID) {
            if (!techeeID) {
                console.warn('No techee ID was passed to select');
                return;
            }
            commit('SELECT_TECHEE', techeeID);
        },
        deselectTechee({commit}) {
            commit('SELECT_TECHEE', '');
        },
        updateDates({commit}, dates) {
            commit('UPDATE_DATES', dates);
        },
    },
    mutations: {
        ADD_TECHEE(state, name) {
            let matches = state.techees.filter(techee => techee.name === name);
            if (!matches.length) {
                state.techees.push({
                    id: uniqid(),
                    name,
                    unavailable: []
                });
            }
        },
        REMOVE_TECHEE(state, id) {
            let rmIndex = -1;
            state.techees.forEach((techee, i) => {
                if (id === techee.id) rmIndex = i;
            });
            state.techees.splice(rmIndex, 1);
        },
        SELECT_TECHEE(state, id) {
            state.selectedID = id;
        },
        UPDATE_DATES(state, dates) {
            let techeeID = state.selectedID;
            state.techees.forEach((techee, i) => {
                if (techee.id === techeeID) {
                    // techee.unavailable = dates;
                    Vue.set(state.techees[i], 'unavailable', dates);
                }
            });
        },
    }
};
