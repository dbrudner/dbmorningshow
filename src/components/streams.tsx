import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Grid from "@material-ui/core/Grid"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { compareDesc, format, parseISO } from "date-fns"
import "bulma/css/bulma.css"

// const useStyles = makeStyles({
//   root: {
//     height: 250,
//   },
//   media: {
//     height: 140,
//   },
//   header: {
// marginTop: "15px",
// marginBottom: "30px",
// // width: "250px",
// whiteSpace: "nowrap",
// overflow: "hidden",
// textOverflow: "ellipsis",
//   },
//   startDate: {
//     color: "#969696",
//     fontSize: "14px",
//     // textTransform: "uppercase",
//     fontWeight: 700,
//     marginBottom: "10px",
//     display: "inline",
//   },
//   cardContent: {
//     height: "100%",
//   },
// })

const StreamCard = ({ title, startDate, endDate, description, link }) => {
  // const classes = useStyles()
  // <Typography component="p" className={classes.startDate}>
  //   {format(new Date(startDate), "LLLL do Y h:mm aa (E)")}
  // </Typography>

  return (
    <div className="card">
      <a href={link} target="_blank" style={{ margin: "20px" }}>
        <div className="card-content">
          <span>{format((new Date(startDate)), "LLL do Y h:mm aa (E)")}</span>
          <img
            width="25"
            src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png"
            style={{ display: "inline-block", margin: 0, float: "right" }}
          />
          <h2
            style={{
              width: "250px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              // display: "inline",
              marginBottom: "15px",
              marginTop: "5px",
            }}
            className="is-size-4"
          >
            {title}
          </h2>
          <div>{documentToReactComponents(JSON.parse(description.raw))}</div>
        </div>
      </a>
    </div>
  )
}

export default function Streams() {
  const { allContentfulStream } = useStaticQuery(graphql`
    query GetStreams {
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

  console.log(allContentfulStream)

  const events = allContentfulStream.edges
    .map(({ node }) => ({
      title: node.title,
      start: new Date(node.startDate),
      end: new Date(node.endDate),
      resources: {
        description: node.description,
        link: node.link,
      },
    }))
    .sort((a, b) => compareDesc(parseISO(a.start), parseISO(b.start)))

  const sortedStreams = allContentfulStream.edges.sort((a, b) =>
    compareDesc(parseISO(a.node.startDate), parseISO(b.node.startDate))
  )

  console.log({ sortedStreams })

  return (
    <div className="streams">
      <h2 className="is-size-2 mb-5">Past</h2>
      <div className="tile is-ancestor">
        {sortedStreams.map(({ node }) => (
          <div className="tile" key={node.title} style={{ padding: "20px" }}>
            <StreamCard {...node} />
          </div>
        ))}
      </div>
    </div>
  )
}
