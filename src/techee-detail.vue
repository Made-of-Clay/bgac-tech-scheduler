<template>
    <div id="techee-detail" 
        class="detail-overlay"
        :class="{'detail-overlay--showing':isShowing}"
        @click.self="hide">
        <div v-if="selectedTechee"
            class="detail-overlay__content">
            *only shows when techee is selected
            *click none-name space to deselect techee
            editable techee name
            <input v-model="selectedTechee.name" 
                type="text">
            unavailable dates (v-calendar?)
            list of added unavailable dates
                date
                - button to remove date
            <strong class="detail-overlay__dates">Unavailable Dates</strong>
            <ul>
                <li v-for="date in selectedTechee.unavailable">
                    {{date}}
                    button
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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

    methods: {
        hide() {
            this.$store.dispatch('deselectTechee');
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
</style>
