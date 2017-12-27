# BGAC Tech Scheduler

## Overall Steps
- load names from before
    - stored in database? file? local storage?
- add/edit/delete tech people
- enter exclusion dates (globally and /person)
- click (button) to assign workers (i.e. run the scheduler)
    - assign random workers evenly on available dates
    - shuffle audio/visual assignments
    - auto-assign prior monday practice to video person
- show results in vue component calendar (considering [v-calendar](https://vcalendar.netlify.com/))
    - tech people are color coded using dots (or bars)
    - hover shows who-doing-what
- export to outlook calendar, google calendar, icalendar formats for import
    - maybe excel too

### First thoughts on how to process
- Go month-by-month
- Build list of priority people to sched next based on how much they've already been added
    - assumes high-ranking people are available
- Assign people to weekends based on availability and frequency of already-scheduled
- Frequency of already-scheduled will be counter map. E.g....

```javascript
const counts = {
    adam: 4,
    forrest: 6,
    todd: 3
};
```


