import "regenerator-runtime/runtime";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
// import "bulma/css/bulma.css";
const contentful = require("contentful");
import { format } from "date-fns";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Popover from "./popover";

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

(async () => {
  let popover;

  const { items } = await client.getEntries({ content_type: "stream" });

  const calendarEl = document.querySelector("#calendar");

  const eventClick = (info) => {
    if (popover) popover.unmount();

    const { el, event } = info;
    const { title, end, start } = event;
    const { description, link } = info.event.extendedProps.data;
    const elDimensions = el.getBoundingClientRect();
    const calendarEl = document.querySelector("#calendar");
    const calendarElDimensions = calendarEl.getBoundingClientRect();

    const top =
      elDimensions.top - calendarElDimensions.top + elDimensions.height;
    // const left = elDimensions.left - calendarElDimensions.left;

    const style = {
      top: `${top}px`,
      // left: `${left}px`,
      width: "300px",
      maxHeight: "400px"
    };

    console.log({ description, link });

    const content = `<div>
      <p class="card-header-title">
        <a href=${link}>
          ${title}
        </a>
      </p>
      <p>
        ${documentToHtmlString(description)}
      </P
    </div>`;

    popover = new Popover({
      el,
      content,
      style
    });

    const offset = document
      .querySelector(".fc-daygrid-day")
      .getBoundingClientRect().width;

    console.log(popover.container);

    const left =
      elDimensions.left - calendarElDimensions.left + offset / 2 - 150;

    popover.setStyle({ left: `${left}px` }).attach(calendarEl);
  };

  const events = items.map(({ fields }) => ({
    title: fields.title,
    start: fields.startDate,
    end: fields.endDate,
    data: {
      description: fields.description,
      link: fields.link
    }
  }));

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    initialView: "dayGridMonth",
    eventClick,
    events
  });

  const streamsEl = document.querySelector("#streams");

  for (const item of items) {
    const {
      fields: { description, startDate, endDate, title, link }
    } = item;

    const el = document.createElement("li");

    el.innerHTML = `<div class="card">
      <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">
            <a href=${link} target="_blank">
              ${title}
            </a>
          </p>
        </div>
      </div>

      <div class="content">
        ${documentToHtmlString(description)}
        <time datetime="2016-1-1">${format(
          new Date(startDate),
          "M/d/yyyy @ h:mm a"
        )}</time>
      </div>
    </div>
    </div>`;

    streamsEl.appendChild(el);
  }

  await calendar.render();
})();
