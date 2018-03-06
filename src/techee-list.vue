<template>
    <section id="techee-container" class="container-techee">
        <div class="techee-add">
            <input v-model="nameInput"
                type="text" 
                class="techee-add__input"
                @keyup.enter="addTechee">
            <button class="techee-add__button"
                @click="addTechee">+</button>
        </div>

        <ul class="techee-list">
            <!-- <li v-for="techee in techees"
                :key="formatNameForKey(techee.id)"
                class="techee-list__item"
                :class="{'techee-list__item--selected':techee.id===selectedID}"
                @click="selectTechee(techee.id)"> -->

                <!-- <span class="techee-name">{{techee.name}}</span>
                <button class="techee-remove btn-icon"
                    :title="`Remove ${techee.name}`"
                    @click="removeTechee(techee.id)">&times;</button> -->
            <!-- </li> -->
            <removable-item v-for="techee in techees"
                class="techee-list__item"
                :class="{'techee-list__item--selected':techee.id===selectedID}"
                :id="techee.id"
                :text="techee.name"
                :key="formatNameForKey(techee.id)"
                @click="selectTechee(techee.id)"
                @remove="removeTechee"></removable-item>
        </ul>

        <div id="techee-list" class="techee-list">
            input to add names
            + button to add names

            list of names already added
                selectable techee name
                - button to remove techee name
        </div>
    </section>
</template>

<script>
import removableItem from './removable-item';

export default {
    components: {
        'removable-item': removableItem,
    },

    data() {
        return {
            nameInput: '',
        };
    },
    computed: {
        techees() {
            return this.$store.state.techees;
        },
        selectedID() {
            return this.$store.state.selectedID;
        },
    },

    methods: {
        addTechee() {
            if (!this.nameInput) return;
            this.$store.dispatch('addTechee', this.nameInput);
            this.clearName();
        },
        removeTechee(id) {
            this.$store.dispatch('removeTechee', id);
        },
        formatNameForKey(name) {
            return name.replace(/ /, '-');
        },
        clearName() {
            this.nameInput = '';
        },
        selectTechee(id) {
            console.log('select', id);
            this.$store.dispatch('selectTechee', id);
        },
    },
};
</script>

<style>
.container-techee {
    background-color: #364253;
    color: hsla(0, 0%, 100%, 0.75);
    font-weight: bold;
}
.techee-list__item {
    transition: color 0.3s, background-color 0.3s;
}
/*.techee-list__item--selected {
    background-color: hsla(215, 21%, 20%, 1);
    color: #7ad2f4;
}*/
.techee-list__item:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
}
.techee-remove {
    transition: all 0.3s;
}
.techee-remove:hover {
    color: red;
}
</style>
