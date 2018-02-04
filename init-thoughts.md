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

## Interactions

### Name List Panel
- Available along the left
    - inline *remove* controls
    - above list is input with *add* button
- Selecting name slides calendar to the side showing details
    - alt. use overlay of details over calendar (instead of sliding)

### Detail Overlay
Details available on tech people:
- Editable tech name
- Entered exclusion dates (w/ *remove* ctl)
- Calendar/datepicker for adding exclusion dates (also considering [v-calendar](https://vcalendar.netlify.com/datepicker) for this)
- *Remove* control to remove current person

Details closed by clicking one of the following:
- X button (in some corner)
- White-space of name list
- Calendar pane hides detail

### Calendar
This is where dates are generated and shown. Following actions will be available:
- *Schedule!* button - runs main schedule algorythm
- Export buttons - **TODO**: figure out how to do this
    - Google Calendar
    - iCalendar
    - Outlook Calendar

Can also navigate the calendar and view who's scheduled when (probably by hovering dates)

## Mobile Treatment
For mobile, 3 tabs will show at the bottom of the screen: 

1. Name List
2. Details
3. Calendar

Details will display "none selected" message when necessary.
