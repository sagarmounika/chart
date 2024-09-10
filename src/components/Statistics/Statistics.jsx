import React from "react"
import {useSelector} from "react-redux"
import style from "./statistics.module.scss"
const Statistics = () => {
  const {dataPoints} = useSelector(state => state.dashboardReducer)
  return (
    <div className={style.statsContainer}>
      <table class="styled-table">
        <tbody>
          <tr>
            <td>Average Price</td>
            <td>
              {" "}
              {(
                dataPoints.reduce((a, b) => a + b.y, 0) / dataPoints.length
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Volatility</td>
            <td>
              {(
                Math.max(...dataPoints.map(dp => dp.y)) -
                Math.min(...dataPoints.map(dp => dp.y))
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
