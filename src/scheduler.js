import {forEach, clone, isArray, isNull} from './utils';
import moment from 'moment';

export default class Scheduler {
    constructor({techees, dateRange}) {
        this.counter = [];
        this.countsNeedReset = false;
        this.dateRange = dateRange;

        this.setupCounter(techees);
        this.setupSundaysFromRange();
    }

    setupCounter(techees) {
        // this.techees.forEach(techee => this.counter[techee.name] = 0);
        // console.log("this.counter", this.counter);
        techees.forEach(techee => (this.counter.push({
            techee,
            count: 0
        })));
    }

    resetCounter() {
        this.counter.forEach(c => c.count = 0);
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
        if (this.countsNeedReset) {
            this.resetCounter();
        }
        console.log(`${this.sundays.length} to work with`, this.sundays);
        let schedule = [];
        // shuffle techees into copy
        let counters = this.counter;
        const otherNum = num => num === 1 ? 2 : 1;
        // each sunday, assign 2 techees w/ lowest count
        this.sundays.forEach(sunday => {
            counters = shuffle(counters); // shuffle each sunday
            let lowest = {cnt1:null, cnt2:null};
            counters.forEach(counter => {
                let unavailable = false;
                // check for unavailable dates
                counter.techee.unavailable.forEach(date => {
                    if (date.getTime() === sunday.getTime()) {
                        unavailable = true;
                    }
                });
                if (unavailable) return; // techee can't do current sunday

                if (isNull(lowest.cnt1)) {
                    lowest.cnt1 = counter;
                } else if (counter.count < lowest.cnt1.count) {
                    lowest.cnt2 = lowest.cnt1;
                    lowest.cnt1 = counter;
                } else if (isNull(lowest.cnt2) || counter.count < lowest.cnt2.count) {
                    lowest.cnt2 = counter;
                }
            });
            // i have 2 techees now w/ low counts; assign jobs
            let rand = Math.floor(Math.random() * 2) + 1;
            let other = otherNum(rand);
            // each assigned techee randomly assigned to a|v
            let video = lowest[`cnt${rand}`].techee.name;
            let audio = lowest[`cnt${other}`].techee.name;
            // v gets practice too
            schedule.push({
                video,
                audio,
                practice: video,
                date: sunday,
            });
            // ++ their counters
            lowest.cnt1.counter++;
            lowest.cnt2.counter++;
        });
        this.countsNeedReset = true;
        return schedule;
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

function buildListFromOrder(counter) {
    let list = [];
    forEach(counter, (cnt, person) => {
        if (!isArray(list[cnt])) {
            list[cnt] = [];
        }
        list[cnt].push(person);
    });
    return list;
}

function getNextTwo(order) {
    let techees = [];
    const HAS_TWO = t => t.length === 2;
    order.forEach((list, orderNum) => {
        if (!isArray(list) || HAS_TWO(techees)) return; // none w/ this orderNum
        list.forEach(techee => {
            if (HAS_TWO(techee)) return;
            techees.push(techee);
        });
    });
    return techees;
}
