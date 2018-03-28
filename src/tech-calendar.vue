<template>
    <section id="calendar-space" class="container-calendar">
        <v-calendar is-double-paned
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
                @click="schedule">Schedule</button>

            <h4>Export to...</h4>

            <button class="btn calendar-commands__export--google"
                @click="exportTo('google')">Google Calendar</button>

            <button class="btn calendar-commands__export--outlook"
                @click="exportTo('outlook')">Outlook Calendar</button>

            <button class="btn calendar-commands__export--apple"
                @click="exportTo('icalendar')">iCalendar</button>
        </div>
    </section>
</template>

<script>
import Scheduler from './scheduler';
import {dateSurpassed} from './scheduler';

export default {
    data() {
        return {
            rangeStart: null,
            rangeEnd: null,
            errMsg: '',
        };
    },
    computed: {
        testDates() {
            let dates = [];
            let { techees } = this.$store.state;
            if (techees.length) {
                techees.forEach(techee => {
                    if (!techee.unavailable.length) return;
                    dates = [...dates, ...techee.unavailable];
                });
            }
            return dates;
        }
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
        schedule() {
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
            let dates = scheduler.schedule();
            // save dates to show them in v-calendar
        },
        exportTo(format) {
            console.log('format', format);
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
</style>
