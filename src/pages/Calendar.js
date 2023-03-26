import React from "react";

import "../styles/calender.scss";
import AddReminderModal from "../components/AddReminderModal";
import CalenderBody from "../components/CalenderBody";
import CalenderHeader from "../components/CalenderHeader";
import { useCalender } from "../hooks/useCalender";

function Calendar() {
  const {
    days,
    firstDayOfTheMonth,
    lastDateOfLastMonth,
    month,
    months,
    year,
    handleChangeMonth,
    isOpened,
    setOpen,
    handleAddReminder,
    reminders,
    fullDaysArray,
    checkForReminderDate,
    handleSetEditableReminder,
    isEditReminder,
    selectedReminder,
    handleEditReminder,
    setSelectedReminder,
    handleCloseModal,
    checkForTodaysDate,
    handleDeleteReminder,
    fetchCities,
    selectedReminderWeather,
    fetchCityWeather,
    cities,
  } = useCalender();

  return (
    <div className="container">
      <AddReminderModal
        fetchCityWeather={fetchCityWeather}
        selectedReminderWeather={selectedReminderWeather}
        handleDeleteReminder={handleDeleteReminder}
        handleCloseModal={handleCloseModal}
        setSelectedReminder={setSelectedReminder}
        handleEditReminder={handleEditReminder}
        selectedReminder={selectedReminder}
        isEditReminder={isEditReminder}
        opened={isOpened}
        handleAddReminder={handleAddReminder}
        setOpen={setOpen}
        cities={cities}
      />
      <div className="calender__title">
        <h1>Calendar</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {months[month]} {year}
          <div style={{ marginLeft: 10, cursor: "pointer" }}>
            <button
              className="add__reminder-btn"
              onClick={() => {
                setOpen(true);
                fetchCities();
              }}
            >
              Add Reminder
            </button>
          </div>
        </div>
      </div>
      <div className="calender">
        <CalenderHeader days={[...days]} />
        <CalenderBody
          checkForTodaysDate={checkForTodaysDate}
          handleSetEditableReminder={handleSetEditableReminder}
          checkForReminderDate={checkForReminderDate}
          reminders={reminders}
          lastDateOfLastMonth={lastDateOfLastMonth}
          daysArray={fullDaysArray}
          firstDayOfTheMonth={firstDayOfTheMonth}
        />
      </div>
      <div className="calender__footer">
        <button onClick={() => handleChangeMonth("decrement", 1)}>
          Previous
        </button>
        <button onClick={() => handleChangeMonth("increment", 1)}>Next</button>
      </div>
    </div>
  );
}

export default Calendar;
