import React from "react"
import {useSelector} from "react-redux"
import style from "./summary.module.scss"
const Summary = () => {
  const {
    dataPoints,

    currentPrice,
  } = useSelector(state => state.dashboardReducer)
  return (
    <div className={style.summaryContainer}>
      <table class="styled-table">
        <tbody>
          <tr>
            <td>Open</td>
            <td>₹{dataPoints[0]?.y.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Close</td>
            <td> ₹{currentPrice}</td>
          </tr>
          <tr>
            <td>High</td>
            <td> ₹{Math.max(...dataPoints.map(dp => dp.y)).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Low</td>
            <td> ₹{Math.min(...dataPoints.map(dp => dp.y)).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td> {new Intl.NumberFormat().format(235519861)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Summary
