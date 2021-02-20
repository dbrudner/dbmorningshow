import React from "react"
import Roadmap from "../components/roadmap"

export default function (props) {
  return (
    <div>
      <div style={{ height: "100vh", position: "relative" }}>
        {/* <h1
          className="is-size-1"
          style={{ position: "absolute", top: "20px", left: "20px" }}
        >
          Front end Roadmap
        </h1> */}
        <Roadmap />
      </div>
    </div>
  )
}
