<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# React Challenge

## How to deploy

- Run `npm install` | `yarn install` to install all dependencies.
- Run `npm start` | `yarn run` to run the app locally.
- You can find the project running on `localhost:3000`.

### Components

This app is built using four components:

- Calendar.jsx
  This is the top-level component that renders the entire calendar. It contains the following child components:

- CalendarHead.jsx: this renders the header row of the calendar, which displays the days of the week.
- CalenderBody.jsx: renders the body of the calendar, which displays the days of the month and any reminders added by the user.
- AddReminderModal.jsx: a modal component that allows the user to add, edit, or delete reminders for specific dates.

#### Hooks

This app uses one custom hook:

- useCalender()

This hook handles all the logic for the calendar, including generating the days and dates of the month, handling user input for adding, editing, and deleting reminders, and fetching weather data for reminders that have a city associated with them.

##### Weather Api

This app uses AccuWeather api key can be found in the key.js file inside the utils folder

###### Key Feetures

- Ability to add multiple reminder for a particular day
- Ability to edit reminders - including changing text, city, day and time
- Ability to delete a reminder
- Ability to view current date
- Dynamic Calendar - calendar supports more than the current month or year.
- handle overflow when multiple reminders appear on the same date
- Added weather service call from AccuWeather
- Added Input validations

###### Limitations to api key usage

Currently AccuWeather provides limit of 50 api calls per day
