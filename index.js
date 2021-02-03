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
  const { items } = await client.getEntries({ content_type: "stream" });

  const calendarEl = document.querySelector("#calendar");

  const eventClick = (info) => {
    const { title, end, start } = info;
    const { description, link } = info.event.extendedProps;

    const content = `<div>
      <header class="card-header">
        <p class="card-header-title">
          ${title}
        </p>
      </header>
    </div>`;
    new Popover({ node: info.el, content });
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

  // console.log({ items });

  // for (const item of items) {
  //   const options = {
  //     title: item.fields.title,
  //     start: item.fields.startDate
  //   };

  //   calendar.addEvent(options);
  // }

  await calendar.render();
})();
