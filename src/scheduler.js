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
        console.log("this.counter", this.counter);
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
        let sundays = [];

        if (isSunday(start)) {
            sundays.push(start);
        } else {
            let nextSunday = getNextSunday(start);
            sundays.push(nextSunday);
        }

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
            if (++cnt === 100) { // [adam]: waaay too many...
                throw new Error('Too many loops');
            }
        }
        // console.log(sundays);
        this.sundays = sundays;
    }

    schedule() {
        console.log(`${this.sundays.length} to work with`, this.sundays);
        // shuffle array of techees
        let techees = shuffle([...this.techees]);
        // make tmp array of techees based on count (lowest cnt to highest)
        // ADAM --- YOU LEFT OFF HERE!!!
        // start loop on first sunday
        // check if 2 smallest count techees can work that day
        // if not, get next techee(s) - rinse repeat until techee can work
        // --- not sure what to do if no one says they can work that day ... error?
        // send 2 smallest count techees to av randomizer (randomizes who is on a or v)
        // add given techees/jobs to schedule object
        // ++ their counts in counter
        // do again
    }
}

// const TOMORROW_TIME = (60 * 60 * 1000);
// const NEXT_WEEK_TIME = (7 * 24 * TOMORROW_TIME);

export function dateSurpassed(date1, date2) {
    return date1.getTime() < date2.getTime();
}

function isSunday(date) {
    return date.getDay() === 0;
}
function getNextSunday(date) {
    let dayDiff = 7 - date.getDay();
    return moment(date).add(dayDiff, 'days')._d;
}

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976
function shuffle(arr) {
    var currentIndex = arr.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}
