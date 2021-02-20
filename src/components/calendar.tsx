import { Popover } from "@material-ui/core"
import format from "date-fns/format"
import getDay from "date-fns/getDay"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
const locales = {
  "en-US": require("date-fns/locale/en-US"),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function MyCalendar(props) {
  const [popoverAnchorEl, setpopoverAnchorEl] = useState(null)
  const { allContentfulStream } = useStaticQuery(graphql`
    query MyQuery {
      allContentfulStream {
        edges {
          node {
            startDate
            title
            link
            endDate
            description {
              raw
            }
          }
        }
      }
    }
  `)

  const events = allContentfulStream.edges.map(({ node }) => ({
    title: node.title,
    start: node.startDate,
    end: node.endDate,
    resources: {
      description: node.description,
      link: node.link,
    },
  }))

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(e, event) => {
          debugger
          console.log({ e, event })
          setpopoverAnchorEl(event.currentTarget)
        }}
      />
      {popoverAnchorEl && (
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={true}
          anchorEl={popoverAnchorEl}
        >
          hey
        </Popover>
      )}
    </div>
  )
}
