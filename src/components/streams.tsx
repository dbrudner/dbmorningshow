import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Grid from "@material-ui/core/Grid"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { format } from "date-fns"

const useStyles = makeStyles({
  root: {
    height: 250,
  },
  media: {
    height: 140,
  },
  header: {
    marginTop: "15px",
    marginBottom: "30px",
    // width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  startDate: {
    color: "#969696",
    fontSize: "14px",
    // textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: "10px",
    display: "inline",
  },
  cardContent: {
    height: "100%",
  },
})

const StreamCard = ({ title, startDate, endDate, description, link }) => {
  const classes = useStyles()

  return (
    <a href={link} target="_blank" style={{ margin: "20px" }}>
      <Card>
        <CardActionArea className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Typography component="p" className={classes.startDate}>
              {format(new Date(startDate), "LLLL do Y h:mm aa (E)")}
            </Typography>
            <CardMedia
              image="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png"
              title="YouTube logo"
              style={{
                width: "20px",
                height: "20px",
                display: "inline-block",
                float: "right",
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.header}
            >
              {title}
            </Typography>

            <div>{documentToReactComponents(JSON.parse(description.raw))}</div>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
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
    <div className="streams">
      <Grid container spacing={5}>
        {allContentfulStream.edges.map(({ node }) => (
          <Grid item xs={12} lg={4} key={node.title}>
            <StreamCard {...node} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
