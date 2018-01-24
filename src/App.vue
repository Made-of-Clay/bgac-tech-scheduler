<template>
    <main id="app" class="main-container">
        <div id="techee-detail" class="detail-overlay">
            <div class="detail-overlay__content">
                *only shows when techee is selected
                *click none-name space to deselect techee
                editable techee name
                unavailable dates (v-calendar?)
                list of added unavailable dates
                    date
                    - button to remove date
            </div>
        </div>

        <techee-list></techee-list>

        <section id="calendar-space" class="container-calendar">
            v-calendar
            big "schedule" button (main call-to-action)
            buttons to export to diff calendar types
        </section>

        <ul id="mobile-tabs" class="m-tabs l-m-tabs">
            <li class="m-tab">Techees</li>
            <li class="m-tab">Details</li>
            <li class="m-tab">Calendar</li>
        </ul>
    </main>
</template>

<script>
import techeeList from './techee-list';

export default {
    name: 'app',
    components: {
        'techee-list': techeeList
    },

    data () {
        return {
        };
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}
html, body, .main-container {
    height: 100%;
}
body {
    margin: 0;
}
#app {
    background-color: #f7f7f7;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.container-techee {
    background-color: #eee;
}
.main-container > section {
    padding: 1em;
}
@media screen and (min-width: 600px) {
    .main-container {
        display: flex;
    }
    .container-techee {
        max-width: 400px;
        /*width: 35%;*/
    }
    .container-calendar {
        width: 100%;
        /*width: 65%;*/
    }
}

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
    display: inline-block;
    margin-top: 25%;
    padding: 1em;
    text-align: left;
    width: 400px;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

a {
    color: #42b983;
}

.m-tabs {
    bottom: 0;
    display: none;
    margin: 0;
    position: fixed;
    width: 100%;
}
@media screen and (max-width: 600px) {
    .m-tabs {
        display: flex;
    }
}
.m-tab {
    flex: 1;
    padding: 1em;
    text-align: center;
}
</style>
