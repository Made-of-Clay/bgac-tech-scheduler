<template>
    <li class="rmable-item"
        @click="clicked">
        <span class="rmable-item__text">{{text}}</span>
        <button class="rmable-item__btn btn-icon"
            :title="`Remove ${text}`"
            @click.stop="remove(id)">&times;</button>
    </li>
</template>

<script>
export default {
    props: {
        id: String,
        text: String,
    },

    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        clicked() {
            this.$emit('click');
        }
    },
};
</script>

<style>
.rmable-item {
    display: flex;
}
.rmable-item__text {
    cursor: pointer;
    flex: 1;
    padding: 0.25em;
}
</style>
