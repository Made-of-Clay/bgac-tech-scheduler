# BGAC Tech Scheduler

## Overall Steps
- enter tech people
- enter exclusion dates / person
- click to assign workers
    - assign random workers evenly on available dates
    - shuffle audio/visual assignments
    - auto-assign prior monday practice to video person
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


