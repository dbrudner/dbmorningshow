import React from "react"
import Layout from "../components/layout"
import Calendar from "../components/calendar"
import Hero from "../components/hero"
import Streams from "../components/streams"

const IndexPage = () => (
  <Layout>
    <Hero />
    <Streams />
    {/* <Calendar /> */}
  </Layout>
)

export default IndexPage
