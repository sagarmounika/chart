import React from "react"
import style from "./analytics.module.scss"
import {useSelector} from "react-redux"
const Analytics = () => {
  const {dataPoints} = useSelector(state => state.dashboardReducer)
  return (
    <div className={style.analyticsContainer}>
      <table class="styled-table">
        <tbody>
          <tr>
            <td> Moving Average</td>
            <td>
              {(
                dataPoints.slice(-50).reduce((a, b) => a + b.y, 0) / 50
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>RSI</td>
            <td>45 (Neutral)</td>
          </tr>
          <tr>
            <td> Bollinger Bands</td>
            <td>
              {(Math.max(...dataPoints.map(dp => dp.y)) +
                Math.min(...dataPoints.map(dp => dp.y))) /
                2}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Analytics
