<template>
    <section id="techee-container" class="container-techee">
        <div class="techee-add">
            <input v-model="nameInput"
                type="text" 
                class="techee-add__input"
                placeholder="Enter a techee (e.g. Adam)"
                @keyup.enter="addTechee">
            <button class="techee-add__button btn-icon"
                :title="`Add ${nameInput}`"
                @click="addTechee">+</button>
        </div>

        <ul class="techee-list">
            <removable-item v-for="techee in techees"
                class="techee-list__item"
                :class="{'techee-list__item--selected':techee.id===selectedID}"
                :id="techee.id"
                :text="techee.name"
                :key="formatNameForKey(techee.id)"
                @click="selectTechee(techee.id)"
                @remove="removeTechee"></removable-item>
        </ul>

        <div id="techee-list" class="techee-list"></div>
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
.techee-add {
    display: flex;
}
.techee-add__input {
    flex: 1;
    font-size: 1.25em;
    padding: 0.25em;
}
.techee-add__button {
    height: 2em;
    width: 2em;
}
.techee-list__item {
    margin-bottom: 0.25em;
    transition: color 0.3s, background-color 0.3s;
}
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
