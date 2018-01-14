<template>
    <main id="app" class="l-main-container">
        <div id="techee-container" class="l-techee-container">
            <div id="techee-list" class="l-techee-list">
                input to add names
                + button to add names

                list of names already added
                    selectable techee name
                    - button to remove techee name
            </div>
            <div id="techee-detail" class="l-techee-detail">
                *only shows when techee is selected
                *click none-name space to deselect techee
                editable techee name
                unavailable dates (v-calendar?)
                list of added unavailable dates
                    date
                    - button to remove date
            </div>
        </div>

        <div id="calendar-space" class="l-calendar-container">
            v-calendar
            big "schedule" button (main call-to-action)
            buttons to export to diff calendar types
        </div>

        <ul id="mobile-tabs" class="m-tabs l-m-tabs">
            <li class="m-tab">Techees</li>
            <li class="m-tab">Details</li>
            <li class="m-tab">Calendar</li>
        </ul>
    </main>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
        };
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
