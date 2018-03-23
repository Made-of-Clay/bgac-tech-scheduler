import {forEach, clone} from './utils';

export default class Scheduler {
    constructor({techees, dateRange}) {
        this.counter = {};
        this.techees = clone(techees, true);
        this.dateRange = dateRange;

        this.setupCounter();
        this.setupSundaysFromRange();
    }

    setupCounter() {
        this.techees.forEach(techee => this.counter[techee.name] = 0);
    }

    resetCounter(hard = false) {
        if (hard) {
            this.counter = {}; // use names
        } else {
            forEach(this.counter, (num, person, counter) => counter[person] = 0);
        }
    }

    setupSundaysFromRange() {
        // let {start, end} = this.dateRange;
        let sundays = getSundays(this.dateRange);
    }
}

function getSundays({start, end}) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    
}
