import { useState } from "react";

import { showToastMessage } from "../helper";
import { AccuWeatherApikey } from "../utils/key";

export const useCalender = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYr = today.getFullYear();

  const [reminders, setReminders] = useState([]);
  const [errMessage] = useState("");
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYr);
  const [isOpened, setOpen] = useState(false);
  const [isEditReminder, setEditReminder] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState({});
  const [days] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [selectedReminderWeather, setSelectedReminderWeather] = useState("");
  const [cities, setCities] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //create Arrays of days in a month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfTheMonth = new Date(year, month, 1).getDay();
  const lastDateOfLastMonth = new Date(year, month, 0).getDate();
  const daysArray = [...Array(daysInMonth).keys()];

  const fullDaysArray = [...Array(daysInMonth).keys()].map((day) => {
    const date = new Date(year, month, day + 1);
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });
  async function fetchCityWeather(locationKey) {
    const url = "http://dataservice.accuweather.com/currentconditions/v1";
    fetch(`${url}/${locationKey}?apikey=${AccuWeatherApikey}`).then(
      (response) =>
        response.json().then((data) => {
          setSelectedReminderWeather(data[0]?.Temperature.Metric.Value);
        })
    );
  }

  async function fetchCities() {
    const url = "http://dataservice.accuweather.com/locations/v1/topcities";
    fetch(`${url}/150?apikey=${AccuWeatherApikey}`)
      .then((response) => response.json())
      .then((data) => {
        const allCities = data.map((city) => ({
          value: city.Key,
          label: city.LocalizedName,
        }));
        setCities(allCities);
      });
  }

  function handleAddReminder(reminder) {
    if (reminder.title.length > 30)
      return showToastMessage(
        "Please enter a reminder that is 30 characters or less."
      );
    setReminders((prevReminders) => [...prevReminders, reminder]);
  }

  function handleEditReminder(newReminder) {
    if (newReminder.title.length > 30)
      return showToastMessage(
        "Please enter a reminder that is 30 characters or less."
      );
    setReminders((prevReminders) =>
      prevReminders.map((reminder) => {
        if (reminder.id === newReminder.id) {
          return { ...reminder, ...newReminder };
        } else {
          return reminder;
        }
      })
    );
    return setEditReminder(false);
  }

  function handleDeleteReminder(id) {
    if (!id) return showToastMessage("Cannot delete reminder");
    const newReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(newReminders);
    setEditReminder(false);
    setOpen(false);
  }

  function checkForTodaysDate(day) {
    return (
      day.year === today.getFullYear() &&
      day.month === today.getMonth() &&
      day.day === today.getDate()
    );
  }

  function handleSetEditableReminder(selectedReminder) {
    setSelectedReminder(selectedReminder);
    setEditReminder(true);
    setOpen(true);
  }

  function checkForReminderDate(first, second) {
    return (
      first.year === second.date.getFullYear() &&
      first.month === second.date.getMonth() &&
      first.day === second.date.getDate()
    );
  }

  function handleChangeMonth(action, value) {
    const newMonth = action === "increment" ? month + value : month - value;
    if (newMonth < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (newMonth > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(newMonth);
    }
  }

  function handleCloseModal() {
    setOpen(false);
    setSelectedReminder({});
    setEditReminder(false);
  }

  return {
    reminders,
    handleAddReminder,
    handleEditReminder,
    errMessage,
    days,
    month,
    year,
    handleChangeMonth,
    daysArray,
    months,
    firstDayOfTheMonth,
    lastDateOfLastMonth,
    checkForTodaysDate,
    isOpened,
    setOpen,
    fullDaysArray,
    checkForReminderDate,
    handleSetEditableReminder,
    isEditReminder,
    selectedReminder,
    setSelectedReminder,
    handleCloseModal,
    handleDeleteReminder,
    cities,
    fetchCities,
    fetchCityWeather,
    selectedReminderWeather,
  };
};
