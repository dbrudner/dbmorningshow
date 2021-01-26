const { default: Calendar } = require("tui-calendar");

import CalendarTUI from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";

const calendarOptions = {
  defaultView: "month"
};

const calendar = new CalendarTUI("section.calendar div", calendarOptions);
