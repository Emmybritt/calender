import React from "react";

const CalenderBody = ({
  daysArray,
  firstDayOfTheMonth,
  lastDateOfLastMonth,
  reminders,
  checkForReminderDate,
  handleSetEditableReminder,
  checkForTodaysDate,
}) => {
  function getPreviousMonthDay() {
    const nextMonthDays = Array.from(
      { length: lastDateOfLastMonth },
      (_, i) => i + 1
    );
    return nextMonthDays.slice(-firstDayOfTheMonth);
  }

  return (
    <ul className="calender__body">
      {Array.from({ length: firstDayOfTheMonth }, (_, _index) => (
        <li
          className="calender__body-list"
          style={{ color: "#ccc" }}
          key={_index}
        >
          {getPreviousMonthDay()[_index]}
        </li>
      ))}
      {daysArray.map((day, _index) => (
        <li
          key={_index}
          style={{
            backgroundColor: checkForTodaysDate(day) && "#08447F",
            color: checkForTodaysDate(day) && "white",
          }}
          className="calender__body-list"
        >
          {_index % 7 === 0 && _index !== 0}
          {day.day}
          {reminders.map((reminder, _index) => {
            return (
              <div key={_index}>
                {checkForReminderDate(day, reminder) && (
                  <div
                    onClick={() => handleSetEditableReminder(reminder)}
                    className="calender__reminder"
                  >
                    {reminder.title}
                  </div>
                )}
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
};

export default CalenderBody;
