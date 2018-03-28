import {forEach, clone} from './utils';
import moment from 'moment';

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
            // consider using for..of here :D
        }
    }

    // each sunday will be checked in schedule()
    setupSundaysFromRange() {
        let {start, end} = this.dateRange;
        // make array
        let sundays = [];
        // check if startDate is sunday & add to array if so
        if (isSunday(start)) {
            sundays.push(start);
        } else {
            // else get next-coming sunday & add to array
            let nextSunday = getNextSunday(start);
            sundays.push(nextSunday);
        }
        // from first-added sunday, count up 7 days
        let looping = true;
        let cnt = 0;
        while (looping) {
            let index = sundays.length - 1;
            let nextSunday = getNextSunday(sundays[index]);
            if (dateSurpassed(end, nextSunday)) {
                looping = false;
            } else {
                sundays.push(nextSunday);
            }
            if (++cnt === 10) {
                throw new Error('Too many loops');
            }
        }
        // console.log(sundays);
        this.sundays = sundays;
    }

    schedule() {
        console.log(`${this.sundays.length} to work with`, this.sundays);
    }
}

// const TOMORROW_TIME = (60 * 60 * 1000);
// const NEXT_WEEK_TIME = (7 * 24 * TOMORROW_TIME);

function isSunday(date) {
    return date.getDay() === 0;
}
// function getNextDay(date) {
//     return new Date(date.getTime() + TOMORROW_TIME);
// }
// function getNextWeek(date) {
//     return moment(date).add(1, 'weeks')._d;
// }
// function getNextWeek(date) {
//     return new Date(date.getTime() + NEXT_WEEK_TIME);
// }
function getNextSunday(date) {
    let dayDiff = 7 - date.getDay();
    return moment(date).add(dayDiff, 'days')._d;
}

export function dateSurpassed(date1, date2) {
    return date1.getTime() < date2.getTime();
}
