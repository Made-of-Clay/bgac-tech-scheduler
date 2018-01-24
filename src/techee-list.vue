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
            <li v-for="techee in techees"
                :key="formatNameForKey(techee.id)"
                class="techee-list__item">
                <span class="techee-name">{{techee.name}}</span>
                <button class="techee-remove"
                    @click="removeTechee(techee.id)">&times;</button>
            </li>
            <!-- <li class="techee-list__item">
                <span class="techee-name">Name</span>
                <button class="techee-remove">&times;</button>
            </li> -->
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
export default {
    data() {
        return {
            nameInput: '',
        }
    },
    computed: {
        techees() {
            return this.$store.state.techees;
        }
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
    },
};
</script>
