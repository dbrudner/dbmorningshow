import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import "./hero.css"
import { useWindowSize } from "@react-hook/window-size"

export default function Hero() {
  const ref = useRef(null)
  const [width] = useWindowSize()
  const height = window.outerHeight;

  console.log({height, width})

  const draw = () => {
    d3.select("svg").remove()

    const div = d3.select(ref.current)

    const svg = div
      .append("svg")
      .attr("width", width)
      .attr("height", height * 0.8)
      .attr("viewBox", [0, 0, 600, 200].join(" "))

    const hillData = [
      { x: 0, y: 150 },
      { x: 150, y: 150 },
      { x: 300, y: 100 },
      { x: 450, y: 20 },
      { x: 600, y: 130 },
    ]

    const hillCurveFunc = d3
      .line()
      .curve(d3.curveBasis)
      .x(function ({ x }) {
        return x
      })
      .y(function ({ y }) {
        return y
      })

    svg
      .append("circle") // attach a circle
      .attr("cx", 500) // position the x-centre
      .attr("cy", 20) // position the y-centre
      .attr("r", 50) // set the radius
      .style("stroke", "orange") // set the line colour
      .style("fill", "yellow") // set the fill colour

    svg
      .append("path")
      .attr("d", hillCurveFunc(hillData as any))
      .attr("stroke", "green")
      // with multiple points defined, if you leave out fill:none,
      // the overlapping space defined by the points is filled with
      // the default value of 'black'
      .attr("fill", "white")
  }

  useEffect(draw, [width, height])

  return (
    <div className="hero">
      <div ref={ref}></div>
      <div className="title">
        <h1 className="is-size-1">The Dave Brudner Morning Show</h1>
        <h2>MWF 8:00 AM CT</h2>
      </div>
    </div>
  )
}
