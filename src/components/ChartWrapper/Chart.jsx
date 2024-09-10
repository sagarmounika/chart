import React, {useRef} from "react"
import CanvasJSReact from "@canvasjs/react-stockcharts"
import {AiOutlineFullscreen} from "react-icons/ai"
import {useSelector} from "react-redux"
import style from "./chart.module.scss"

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

const Chart = () => {
  const {dataPoints} = useSelector(state => state.dashboardReducer)
  const chartContainerRef = useRef(null)

  const options = {
    title: {text: ""},
    theme: "light2",
    toggleFullScreen: true,
    exportEnabled: true,
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
        labelFontWeight: "bold",
        padding: 4,
        width: 50,
        labelFontFamily: "'Montserrat', sans-serif",
        backgroundColorOnHover: "#4B40EE",
        backgroundColorOnSelect: "#4B40EE",
      },
      inputFields: {
        label: "",
        style: {
          borderColor: "#d3d3d3",
          fontColor: "#6F7177",
          fontSize: 12,
        },
      },
    },
    toolbar: {
      itemBackgroundColor: "#fff",
      itemBackgroundColorOnHover: "#4B40EE",
      // fontColor: "#d6d6d6",
      fontColorOnHover: "#d3d3d3",
    },
  }
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }
  const containerProps = {width: "80%", height: "65%"}

  return (
    <div ref={chartContainerRef} className={style.chartContainerWrapper}>
      <div className={style.btnContainer}>
        <button onClick={toggleFullScreen} className={style.screenBtn}>
          <AiOutlineFullscreen />
        </button>
      </div>
      <div className={style.chartContainer}>
        {" "}
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      </div>
    </div>
  )
}

export default Chart
