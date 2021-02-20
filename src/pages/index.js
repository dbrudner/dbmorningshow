import React from "react"
import Layout from "../components/layout"
import Calendar from "../components/calendar"
import Hero from "../components/hero"
import Streams from "../components/streams"
import Roadmap from "../components/roadmap"

const IndexPage = () => (
  <Layout>
    {/* <Roadmap /> */}
    <Hero />
    <Streams />
  </Layout>
)

export default IndexPage
