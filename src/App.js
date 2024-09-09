import React, {useState, useEffect, useRef} from "react"
import CanvasJSReact from "@canvasjs/react-stockcharts"
import {Tabs, TabList, Tab, TabPanel} from "react-tabs"
import "react-tabs/style/react-tabs.css"
import "./App.css"
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

const App = () => {
  const [dataPoints, setDataPoints] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)
  const [priceChangePercent, setPriceChangePercent] = useState(0)
  const [selectedTab, setSelectedTab] = useState(1)
  const chartContainerRef = useRef(null)

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`
    const apiUrl = `https://api.upstox.com/v2/historical-candle/NSE_EQ%7CINE848E01016/month/${formattedDate}`

    fetch(apiUrl)
      .then(res => res.json())
      .then(response => {
        const candles = response.data.candles
        const dps = candles.map(([timestamp, , , , close]) => ({
          x: new Date(timestamp),
          y: close,
        }))

        const latestClose = candles[0][4]
        const previousClose = candles[1][4]
        const change = latestClose - previousClose
        const changePercent = ((change / previousClose) * 100).toFixed(2)

        setCurrentPrice(latestClose.toFixed(2))
        setPriceChange(change.toFixed(2))
        setPriceChangePercent(changePercent)
        setDataPoints(dps.reverse())
        setIsLoaded(true)
      })
  }, [])

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const options = {
    title: {
      text: "",
    },
    theme: "light2",
    subtitles: [
      {
        text: "₹",
      },
    ],
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
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Price (in ₹)",
            type: "splineArea",
            color: "#3576a8",
            yValueFormatString: "₹#,###.##",
            xValueFormatString: "MMM DD YYYY",
            dataPoints: dataPoints,
          },
        ],
      },
    ],
    rangeSelector: {
      inputFields: {
        style: {
          backgroundColor: "#4b8bec",
          border: "none",
          color: "#fff",
          borderRadius: "5px",
          padding: "5px",
          marginRight: "10px",
        },
      },
      buttons: [
        {
          label: "1M",
          range: 1,
          rangeType: "month",
          style: {
            backgroundColor: "#4b8bec",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px",
            marginRight: "10px",
          },
        },
        {
          label: "3M",
          range: 3,
          rangeType: "month",
          style: {
            backgroundColor: "#4b8bec",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px",
            marginRight: "10px",
          },
        },
        {
          label: "6M",
          range: 6,
          rangeType: "month",
          style: {
            backgroundColor: "#4b8bec",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px",
            marginRight: "10px",
          },
        },
        {
          label: "1Y",
          range: 1,
          rangeType: "year",
          style: {
            backgroundColor: "#4b8bec",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px",
            marginRight: "10px",
          },
        },
      ],
    },
  }

  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto",
  }

  return (
    <div className="app-container">
      {isLoaded && (
        <div className="header">
          <div className="price">₹{currentPrice}</div>
          <div
            className="change"
            style={{color: priceChange >= 0 ? "green" : "red"}}
          >
            {priceChange >= 0 ? "+" : "-"}
            {Math.abs(priceChange)} ({priceChangePercent}%)
          </div>
        </div>
      )}

      <Tabs
        selectedIndex={selectedTab}
        onSelect={tabIndex => setSelectedTab(tabIndex)}
      >
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Chart</Tab>
          <Tab>Statistics</Tab>
          <Tab>Analysis</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanel>
          <div className="summary">
            <p>Open: ₹{dataPoints[0]?.y.toFixed(2)}</p>
            <p>Close: ₹{currentPrice}</p>
            <p>High: ₹{Math.max(...dataPoints.map(dp => dp.y)).toFixed(2)}</p>
            <p>Low: ₹{Math.min(...dataPoints.map(dp => dp.y)).toFixed(2)}</p>
            <p>Volume: {new Intl.NumberFormat().format(235519861)}</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div ref={chartContainerRef} className="chart-container">
            <div className="range-selector-container">
              <div className="range-selectors">
                <button>1M</button>
                <button>3M</button>
                <button>6M</button>
                <button>1Y</button>
              </div>
              <button onClick={toggleFullScreen} className="fullscreen-btn">
                Full Screen
              </button>
            </div>
            <CanvasJSStockChart
              containerProps={containerProps}
              options={options}
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="statistics">
            <p>
              Average Price: ₹
              {(
                dataPoints.reduce((a, b) => a + b.y, 0) / dataPoints.length
              ).toFixed(2)}
            </p>
            <p>
              Volatility: ₹
              {(
                Math.max(...dataPoints.map(dp => dp.y)) -
                Math.min(...dataPoints.map(dp => dp.y))
              ).toFixed(2)}
            </p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="analysis">
            <p>
              Moving Average: ₹
              {(
                dataPoints.slice(-50).reduce((a, b) => a + b.y, 0) / 50
              ).toFixed(2)}
            </p>
            <p>RSI: 45 (Neutral)</p>
            <p>
              Bollinger Bands: ₹
              {(
                (Math.max(...dataPoints.map(dp => dp.y)) +
                  Math.min(...dataPoints.map(dp => dp.y))) /
                2
              ).toFixed(2)}
            </p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="settings">
            <p>Change Theme</p>
            <p>Select Chart Type</p>
            <p>Customize Indicators</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
