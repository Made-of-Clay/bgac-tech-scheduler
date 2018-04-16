<template>
    <div id="techee-detail" 
        class="detail-overlay"
        :class="{'detail-overlay--showing':isShowing}"
        @click.self="hide">
        <div v-if="selectedTechee"
            class="detail-overlay__content">
            <input v-model="selectedTechee.name" 
                type="text">

            <v-date-picker mode="multiple"
                v-model="selectedTechee.unavailable"
                @input="datesChanged"></v-date-picker>

            <strong class="detail-overlay__heading">Unavailable Dates</strong>
            <ul class="detail-overlay__dates">
                <removable-item v-if="!noDates"
                    v-for="(date, i) in selectedTechee.unavailable"
                    :key="`date-${i}`"
                    :id="`index-${i}`"
                    :text="formatDate(date)"
                    class="detail-overlay__date"
                    @remove="removeDate"></removable-item>
                <li v-if="noDates" class="detail-overlay__date--none">No dates added yet!</li>
            </ul>
        </div>
    </div>
</template>

<script>
import removableItem from './removable-item';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default {
    components: {
        'removable-item': removableItem,
    },

    data() {
        return {
            selectedDates: [],
            hiding: false,
        };
    },
    computed: {
        selectedID() {
            return this.$store.state.selectedID;
        },
        selectedTechee() {
            return this.$store.getters.selectedTechee;
        },
        isShowing() {
            return !!this.selectedID;
        },
        noDates() {
            return this.selectedTechee && this.selectedTechee.unavailable && !this.selectedTechee.unavailable.length;
        },
    },

    methods: {
        hide() {
            this.$store.dispatch('deselectTechee');
        },
        removeDate(index) {
            let iNum = parseInt(index.substring(6));
            let {unavailable} = this.selectedTechee;
            let updatedDates = unavailable.filter((date, i) => i !== iNum);
            this.$store.dispatch('updateDates', updatedDates);
            this.selectedDates = updatedDates;
        },
        formatDate(date) {
            let d = new Date(date);
            let dayOfWeek = days[d.getDay()];
            return `${dayOfWeek}, ${d.toLocaleDateString()}`;
        },
        datesChanged(dates) {
            this.$store.dispatch('updateDates', dates);
        }
    },
};
</script>

<style>
.detail-overlay {
    background-color: rgba(0, 0, 0, 0.9);
    display: none;
    height: 100%;
    position: fixed;
    width: 100%;
    z-index: 1;
}
.detail-overlay--showing {
    display: block;
}
.detail-overlay__content {
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 2px 5px black, 0 6px 15px rgba(0,0,0,0.5);
    left: 0;
    padding: 1em;
    position: fixed;
    top: 20px;
    width: 100%;
}
@media (min-width: 400px) {
    .detail-overlay__content {
        left: 50%;
        margin-left: -200px;
        top: 25%;
        width: 400px;
    }
}
.detail-overlay__content input {
    padding: 0.5em;
}
.detail-overlay__heading {
    display: block;
    margin: 0.75em 0 0.1em;
}
.detail-overlay__dates {
    margin: 0;
}
.detail-overlay__dates > li {
    margin-top: 0.5em;
}
.detail-overlay__date {
    padding: 0.25em 0;
}
.detail-overlay__date:hover {
    background-color: #eaf2f6;
    transition: background-color 0.3s;
}
.btn-rm-date {
    float: right;
}
.detail-overlay__date--none {
    font-style: italic;
}
</style>
