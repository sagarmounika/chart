import React, {useRef} from "react"
import CanvasJSReact from "@canvasjs/react-stockcharts"
import {useSelector} from "react-redux"
import style from "./chart.module.scss"

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

const Chart = ({toggleFullScreen}) => {
  const {dataPoints} = useSelector(state => state.dashboardReducer)
  const chartContainerRef = useRef(null)

  const options = {
    title: {text: ""},
    theme: "light2",

    charts: [
      {
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY",
          },
        },
        axisY: {
          title: "Price",
          prefix: "₹",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "₹#,###.##",
          },
        },
        toolTip: {shared: true},
        data: [
          {
            name: "Price (in ₹)",
            type: "splineArea",
            color: "#4B40EE",
            yValueFormatString: "₹#,###.##",
            xValueFormatString: "MMM DD YYYY",
            dataPoints,
            fillOpacity: 0.1,
          },
        ],
      },
    ],
    rangeSelector: {
      label: "",
      height: 60,
      buttonStyle: {
        spacing: 6,
        backgroundColor: "white",
        borderThickness: 0,
        labelFontColor: "#6F7177",
        labelFontSize: 14,
        labelFontWeight: "normal",
        padding: 4,
        width: 50,
        labelFontFamily: "'Montserrat', sans-serif",
        backgroundColorOnHover: "#4B40EE",
        backgroundColorOnSelect: "#4B40EE",
      },
      inputFields: {
        label: "",
        style: {
          borderColor: "#6F7177",
          fontColor: "#6F7177",
          fontSize: 15,
        },
      },
    },
  }

  const containerProps = {width: "80%", height: "450px"}

  return (
    <div ref={chartContainerRef} className={style.chartContainer}>
      <button onClick={toggleFullScreen} className={style.screenBtn}>
        Full Screen
      </button>
      <CanvasJSStockChart containerProps={containerProps} options={options} />
    </div>
  )
}

export default Chart
