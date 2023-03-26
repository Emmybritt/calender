import React from "react";

const CalenderHeader = (days) => {
  const { days: daysOfTheWeek } = days;

  return (
    <ul className="calender__header">
      {daysOfTheWeek.map((day, _index) => (
        <li key={_index}>{day}</li>
      ))}
    </ul>
  );
};

export default CalenderHeader;
