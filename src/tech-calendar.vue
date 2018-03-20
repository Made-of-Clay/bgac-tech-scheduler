<template>
    <section id="calendar-space" class="container-calendar">
        <v-calendar is-double-paned
            is-expanded></v-calendar>

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
export default {
    data() {
        return {};
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

    methods: {
        schedule() {
            console.log('BOOM');
        },
        exportTo(format) {
            console.log('format', format);
        }
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
</style>
