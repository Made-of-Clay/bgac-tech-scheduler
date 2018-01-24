"use strict";

/*
names of techees
exclusion dates
 */

export default {
    state: {
        techees: [/*{
            name: 'Adam',
            unavailable: ['1-1-2018']
        }*/]
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
        }
    },
    mutations: {
        ADD_TECHEE(state, name) {
            let matches = state.techees.filter(techee => techee.name === name);
            if (!matches.length) {
                state.techees.push({
                    name,
                    unavailable: []
                });
            }
        }
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
