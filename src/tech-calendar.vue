<template>
    <section id="calendar-space" class="container-calendar">
        <v-calendar :attributes="attributes"
            is-double-paned
            is-expanded></v-calendar>

        <div v-if="errMsg"
            class="err-msg">
            <output v-html="errMsg"></output>
            <button class="clear-err"
                @click="clearErr">&times;</button>
        </div>

        <div class="calendar-scheduler-range">
            <div class="range-entry range-start">
                <span class="label">Start</span>
                <v-date-picker mode="single"
                    v-model="rangeStart"
                    class="range-picker"></v-date-picker>
            </div>
            <div class="range-entry range-end">
                <span class="label">End</span>
                <v-date-picker mode="single"
                    v-model="rangeEnd"
                    class="range-picker"></v-date-picker>
            </div>
        </div>

        <div class="calendar-commands">
            <button class="calendar-commands__schedule"
                @click="runSchedule">Schedule</button>

            <!-- <h4>Export to...</h4> -->

            <!-- <button class="btn calendar-commands__export--google"
                @click="exportTo('google')">Google Calendar</button>

            <button class="btn calendar-commands__export--outlook"
                @click="exportTo('outlook')">Outlook Calendar</button>

            <button class="btn calendar-commands__export--apple"
                @click="exportTo('icalendar')">iCalendar</button> -->
        </div>

        <div v-if="csv" id="csv-result">
            <h2>CSV Result</h2>
            <textarea v-html="csv" id="csv-output"></textarea>
        </div>
    </section>
</template>

<script>
import Scheduler from './scheduler';
import moment from 'moment';
import {dateSurpassed} from './scheduler';

export default {
    data() {
        return {
            schedule: [],
            rangeStart: null,
            rangeEnd: null,
            errMsg: '',
        };
    },
    computed: {
        attributes() {
            let highlight = {
                backgroundColor: '#79B2F9',
                borderColor: '#004EB0',
                borderWidth: '2px',
                borderStyle: 'solid',
            };
            return this.schedule.map(item => {
                let label = item.practice
                    ? `Practice: ${item.practice}`
                    : `S: ${item.audio} - V: ${item.video}`;
                let dates = item.practice
                    ? moment(item.date).subtract(6, 'days')._d
                    : item.date;
                return {
                    dates,
                    highlight,
                    popover: { label }
                };
            });
        },
        jsonForCsv() {
            if (!this.schedule || !this.schedule.length) return;
            return this.schedule.map(item => {
                let label = item.practice
                    ? `Practice: ${item.practice}`
                    : `S: ${item.audio} - V: ${item.video}`;
                let dates = item.practice
                    ? moment(item.date).subtract(6, 'days')._d
                    : item.date;
                return {
                    Subject: label,
                    'Start Date': formatForCsv(dates),
                    'Start Time': item.practice ? '7:00 PM' : '8:30 AM',
                    'End Date': formatForCsv(dates),
                    'End Time': item.practice ? '8:30 PM' : '9:30 AM',
                    'All Day Event': false
                };
            });
        },
        csv() {
            if (!this.jsonForCsv || !this.jsonForCsv.length) return;
            let keys = [Object.keys(this.jsonForCsv[0]).join(',')];
            let data = this.jsonForCsv.map(item => {
                return Object.values(item).join(',');
            });
            return [...keys, ...data].join('\n');
        },
    },

    watch: {
        rangeStart() {
            this.compareDates();
        },
        rangeEnd() {
            this.compareDates();
        },
    },

    methods: {
        runSchedule() {
            if (!this.rangeStart || !this.rangeEnd) {
                this.errMsg = 'You must select a start and finish range';
                return;
            }
            let scheduler = new Scheduler({
                techees: this.$store.state.techees,
                dateRange: {
                    start: this.rangeStart,
                    end: this.rangeEnd,
                }
            });
            let schedule = scheduler.schedule();
            // console.log('this.schedule', this.schedule);
            let mondays = [];
            let sundays = [];
            schedule.forEach(item => {
                mondays.push({
                    date: item.date,
                    practice: item.practice
                });
                sundays.push({
                    date: item.date,
                    video: item.video,
                    audio: item.audio,
                });
            });
            this.schedule = [...mondays, ...sundays];
            // save dates to show them in v-calendar
        },
        exportTo(format) {
            console.log("format", format);
        },
        exportCSV() {
            // let csvContent = 'data:text/csv;charset=utf-8,';
            let w = window.open('');
            let textarea = w.document.createElement('textarea');
            textarea.innerHTML = this.csv;
            w.document.body.appendChild(textarea);
        },
        clearErr() {
            this.errMsg = '';
        },
        compareDates() {
            if (!this.rangeStart || !this.rangeEnd) return;
            let start = new Date(this.rangeStart);
            let end = new Date(this.rangeEnd);
            if (dateSurpassed(end, start)) {
                this.errMsg = 'The <b>"start"</b> date must be before the <b>"end"</b> date';
            } else if (this.errMsg && start < end) {
                this.clearErr();
            }
        },
    }
};

function formatForCsv(date) {
    let month = date.getMonth() + 1;
    if (month.toString().length === 1) month = `0${month}`;
    let day = date.getDay();
    if (day.toString().length === 1) day = `0${day}`;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
</script>

<style>
.container-calendar {
    margin: 0 auto;
    max-width: 1040px;
}
.calendar-commands {
    text-align: center;
}
.calendar-commands > button:focus {
    outline: none;
}
.range-picker input {
    padding: 0.5em;
}
.calendar-commands__schedule {
    background: linear-gradient(#00E883, #00D075) #00E883;
    border: none;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgb(54, 66, 83), 0 6px 12px rgba(0, 0, 0, 0.1);
    color: var(--white-text);
    font-size: 2em;
    margin: 1em;
    text-shadow: 2px 1px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}
.calendar-commands__schedule:hover {
    transform: scale(1.05);
}
.calendar-commands__schedule:active {
    box-shadow: none;
}
.btn[class^='calendar-commands__export'] {

}
.err-msg {
    background-color: hsla(0, 100%, 50%, 0.3);
    border: 3px double red;
    border-radius: 3px;
    font-size: 1.2em;
    margin-top: 1em;
    padding: 0.5em;
}
.clear-err {
    background-color: transparent;
    border: none;
    cursor: pointer;
    float: right;
    font-size: 1.25em;
    line-height: 1;
}
.calendar-scheduler-range {
    padding-top: 1em;
    text-align: center;
}
.range-entry {
    display: inline-block;
}
.range-entry > .label {
    display: block;
    text-align: left;
}
#csv-result {
    margin-top: 1em;
}
#csv-result > h2 {
    font-size: 1.2em;
}
#csv-output {
    display: inline-block;
    height: 100px;
    width: 100%;
}
</style>
