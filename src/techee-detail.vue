<template>
    <div id="techee-detail" 
        class="detail-overlay"
        :class="{'detail-overlay--showing':isShowing}"
        @click.self="hide">
        <div v-if="selectedTechee"
            class="detail-overlay__content">
            <!-- 
            *only shows when techee is selected
            *click none-name space to deselect techee
            editable techee name
            -->
            <input v-model="selectedTechee.name" 
                type="text">

            <v-date-picker mode="multiple"
                v-model="selectedDates"></v-date-picker>
            <!-- 
            unavailable dates (v-calendar?)
            list of added unavailable dates
                date
                - button to remove date
            -->
            <strong class="detail-overlay__heading">Unavailable Dates</strong>
            <ul class="detail-overlay__dates">
                <li v-for="(date, i) in selectedTechee.unavailable"
                    class="detail-overlay__date">
                    {{formatDate(date)}}
                    <button class="btn-rm-date"
                        title="Remove Unavailable Date"
                        @click="removeDate(i)">&times;</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default {
    data() {
        return {
            selectedDates: []
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
    },

    watch: {
        selectedDates(dates) {
            this.$store.dispatch('updateDates', dates);
        }
    },
    methods: {
        hide() {
            this.$store.dispatch('deselectTechee');
        },
        removeDate(index) {
            let {unavailable} = this.selectedTechee;
            let updatedDates = unavailable.filter((date, i) => i !== index);
            // this.$store.dispatch('updateDates', updatedDates);
            this.selectedDates = updatedDates;
        },
        formatDate(date) {
            let d = new Date(date);
            let dayOfWeek = days[d.getDay()];
            return `${dayOfWeek}, ${d.toLocaleDateString()}`;
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
.detail-overlay__heading {
    display: block;
    margin: 0.75em 0 0.1em;
}
.detail-overlay__dates {
    margin: 0;
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
</style>
