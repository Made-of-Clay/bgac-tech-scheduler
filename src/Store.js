import Vue from 'vue';

export default {
    state: {
        techees: [/*{
            id: '123-123-123',
            name: 'Adam',
            unavailable: ['345-345-345']
        }*/],
        selectedID: '',
        unavailableDates: {/*
            '345-345-345': '1-1-2018'
        */}
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
            if (!dates.length) {
                console.warn('No dates passed to add');
                return;
            }
            commit('UPDATE_DATES', dates);
        },
        addUnavailableDates({commit, state}, {dates, techeeID}) {
            let error = '';
            if (isArray(dates) && !dates.length) {
                error = 'passed dates list was empty';
            } else if (!dates) {
                error = 'passed dates was empty value';
            } else if (!techeeID) {
                error = 'no techeeID passed';
            }
            let matches = state.techees.filter(techee => techee.id === techeeID);
            if (!matches.length) {
                error = `no techees found with ID "${techeeID}"`;
            }
            if (error) {
                console.error(`action: addUnavailableDates >> ${error}`);
                return;
            }
            dates = isArray(dates) ? dates : [dates];
            commit('ADD_UNAVAILABLE_DATES', {dates, techeeID});
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
        ADD_UNAVAILABLE_DATES(state, {dates, techeeID}) {
            let techeeIndex = -1;
            state.techees.forEach((techee, i) => {
                if (techee.id === techeeID) {
                    techeeIndex = i;
                }
            });
            dates.forEach(date => {
                let id = uniqid();
                state.unavailableDates[id] = date;
                state.techees[techeeIndex].unavailable.push(id);
            });
        },
    }
};

function uniqid(prefixParam = '') {
    let prefix = (isString(prefixParam) && prefixParam !== '') ? `${prefixParam}-` : '';
    let newID = `${prefix}${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

    if (document && document.getElementById(newID)) {
        newID = uniqid(prefixParam);
    }
    return newID;

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
function isString(val) {
    return typeof val === 'string';
}
function isArray(val) {
    return Array.isArray(val);
}
