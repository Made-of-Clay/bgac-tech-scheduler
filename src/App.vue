<template>
    <main id="app" class="main-container">
        <techee-detail></techee-detail>

        <techee-list></techee-list>

        <tech-calendar></tech-calendar>

        <ul id="mobile-tabs" class="m-tabs l-m-tabs">
            <li class="m-tab">Techees</li>
            <li class="m-tab">Details</li>
            <li class="m-tab">Calendar</li>
        </ul>
    </main>
</template>

<script>
import techeeList from './techee-list';
import techeeDetail from './techee-detail';
import techCalendar from './tech-calendar';

export default {
    name: 'app',
    components: {
        'techee-list': techeeList,
        'techee-detail': techeeDetail,
        'tech-calendar': techCalendar,
    },

    data () {
        return {
        };
    }
};
</script>

<style>
* {
    box-sizing: border-box;
}
html, body, .main-container {
    height: 100%;
}
body {
    --white-text: rgba(255, 255, 255, 0.85);

    margin: 0;
}
#app {
    background-color: #eaf2f6;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.main-container > section {
    padding: 1em;
}
@media screen and (min-width: 600px) {
    .main-container {
        display: flex;
    }
    .container-techee {
        width: 400px;
    }
    .container-calendar {
        width: 100%;
    }
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

.btn-icon {
    background-color: rgba(0, 0, 0, 0.25);
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.25em;
    line-height: 1;
    padding: 0.1em 0.4em;
    transition: background-color 0.3s;
}
/*.btn-icon:hover {
    background-color: black;
}*/
</style>
