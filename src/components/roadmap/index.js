import React, { useState } from "react"
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer"
const onLoad = reactFlowInstance => {
  console.log("flow loaded:", reactFlowInstance)
  reactFlowInstance.fitView()
}
const OverviewFlow = () => {
  console.log("H")
  const [elements, setElements] = useState(initialElements)
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els))
  const onConnect = params => setElements(els => addEdge(params, els))
  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <MiniMap
        nodeStrokeColor={n => {
          if (n.style?.background) return n.style.background
          if (n.type === "input") return "#0041d0"
          if (n.type === "output") return "#ff0072"
          if (n.type === "default") return "#1a192b"
          return "#eee"
        }}
        nodeColor={n => {
          if (n.style?.background) return n.style.background
          return "#fff"
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  )
}

// const schedule = [
//   {
//     id: "schedule-1",
//     type: "input",
//     data: {
//       label: (
//         <>
//           Days: <strong>0</strong>
//         </>
//       ),
//     },
//     position: { x: 250, y: 0 },
//   },
// ]

const schedule = [0, 7, 14, 30, 60, 90].map((num, i) => ({
  id: `schedule-${num}`,
  type: "input",
  data: {
    label: `Days: ${num}`,
  },
  position: { x: 250, y: i * 200 },
}))

const items = [
  {
    id: `item-1`,
    type: "input",
    data: {
      label: (
        <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-html-and-html5">
          Basic HTML
        </a>
      ),
    },
    position: { x: 90, y: 75 },
  },
  {
    id: `item-2`,
    type: "input",
    data: {
      label: (
        <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-css">
          Basic CSS
        </a>
      ),
    },
    position: { x: 90, y: 125 },
  },
  {
    id: `item-3`,
    type: "input",
    data: {
      label: (
        <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-html-and-html5">
          Basic JavaScript
        </a>
      ),
    },
    position: { x: 350, y: 92 },
    targetPosition: "right",
    sourcePosition: "right",
  },
]

const basicJavaScriptItems = [
  {
    id: `basic-js-item-1`,
    type: "input",
    data: {
      label: (
        <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#es6">
          ES6 - Modern JavaScript syntax
        </a>
      ),
    },
    position: { x: 525, y: 40 },
    targetPosition: "left",
    sourcePosition: "left",
  },
  {
    id: `basic-js-item-2`,
    type: "input",
    data: {
      label: (
        <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-algorithm-scripting">
          Basic Algorithms
        </a>
      ),
    },
    position: { x: 525, y: 120 },
    targetPosition: "left",
    sourcePosition: "left",
  },
]

const basicJavaScriptArrows = basicJavaScriptItems.map(item => ({
  id: `e-${item.id}-item-3`,
  target: item.id,
  source: "item-3",
  arrowHeadType: "arrowClosed",
}))

// const basicJavaScriptArrows = [
//   {
//     id: "item-3-js-item-1",
//     source: "item-3",
//     target: "basic-js-item-1",
//     arrowHeadType: "arrowclosed",
//   },
// ]

const initialElements = [
  ...schedule,
  ...basicJavaScriptItems,
  ...basicJavaScriptArrows,
  ...items,
]

// const initialElements = [
// {
//   id: "1",
//   type: "input",
//   data: {
//     label: (
//       <>
//         Days: <strong>0</strong>
//       </>
//     ),
//   },
//   position: { x: 250, y: 0 },
// },
//   {
//     id: "2",
//     data: {
//       label: (
//         <>
//           Basic <strong>HTML</strong>
//           <>
//             <ol
//               style={{
//                 textAlign: "left",
//                 listStyle: "decimal",
//                 marginLeft: "15px",
//               }}
//             >
//               <li>
//                 <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-html-and-html5">
//                   Basic HTML
//                 </a>
//               </li>
//               <li>
// <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-css">
//   Basic CSS
// </a>
//               </li>
//               <li>
//                 <a href="https://www.freecodecamp.org/learn/responsive-web-design/#responsive-web-design-projects">
//                   Responsive Design Projects
//                 </a>
//               </li>
//             </ol>
//           </>
//         </>
//       ),
//     },
//     position: { x: 50, y: 100 },
//   },
//   {
//     id: "3",
//     data: {
//       label: (
//         <>
//           Basic <strong>CSS</strong>
//         </>
//       ),
//     },
//     position: { x: 250, y: 100 },
//     style: {
//       background: "#D6D5E6",
//       color: "#333",
//       border: "1px solid #222138",
//       width: 180,
//     },
//   },
//   {
//     id: "4",
//     position: { x: 450, y: 100 },
//     data: {
//       label: (
//         <>
//           Basic <strong>Javascript</strong>
//         </>
//       ),
//     },
//   },
//   {
//     id: "5",
//     data: {
//       label: "hi",
//     },
//     position: { x: 150, y: 250 },
//     style: {
//       width: 175,
//     },
//   },
//   {
//     id: "6",
//     data: {
//       label: (
//         <>
//           <ol
//             style={{
//               textAlign: "left",
//               listStyle: "decimal",
//               marginLeft: "15px",
//             }}
//           >
//             <li>
// <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript">
//   Basic JavaScript
// </a>
//             </li>
// <li>
//   <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#es6">
//     ES6 - Modern JavaScript syntax
//   </a>
// </li>
// <li>
// <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-algorithm-scripting">
//   Basic Algorithms
// </a>
// </li>
//           </ol>
//         </>
//       ),
//     },
//     position: { x: 350, y: 250 },
//     style: {
//       width: 175,
//     },
//   },
//   {
//     id: "7",
//     type: "output",
//     data: { label: "Another output node" },
//     position: { x: 400, y: 450 },
//   },
//   { id: "e1-2", source: "1", target: "2" },
//   { id: "e1-3", source: "1", target: "3" },
//   { id: "e1-4", source: "1", target: "4" },
// {
//   id: "e2-5",
//   source: "2",
//   target: "5",
//   arrowHeadType: "arrowclosed",
// },
//   {
//     id: "e3-5",
//     source: "3",
//     target: "5",
//     arrowHeadType: "arrowclosed",
//   },
//   {
//     id: "e4-6",
//     source: "4",
//     target: "6",
//     type: "arrowclosed",
//   },
//   {
//     id: "e5-7",
//     source: "5",
//     target: "7",
//     type: "step",
//     style: { stroke: "#f6ab6c" },
//     label: "a step edge",
//     animated: true,
//     labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
//   },
// ]

export default OverviewFlow
