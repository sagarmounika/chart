import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

// Async thunk to fetch data
export const fetchChartData = createAsyncThunk(
  "dashboard/fetchChartData",
  async () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`
    const apiUrl = `https://api.upstox.com/v2/historical-candle/NSE_EQ%7CINE848E01016/month/${formattedDate}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.data.candles
  }
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dataPoints: [],
    currentPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    isLoaded: false,
    selectedTab: 1,
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload
    },
  },
  extraReducers: builder => {
     builder.addCase(fetchChartData.pending, state => {
       state.loading = true
       state.error = null
     })
    builder
      .addCase(fetchChartData.fulfilled, (state, action) => {
        const candles = action.payload
        const dps = candles.map(([timestamp, , , , close]) => ({
          x: new Date(timestamp),
          y: close,
        }))

        const latestClose = candles[0][4]
        const previousClose = candles[1][4]
        const change = latestClose - previousClose
        const changePercent = ((change / previousClose) * 100).toFixed(2)

        state.currentPrice = latestClose.toFixed(2)
        state.priceChange = change.toFixed(2)
        state.priceChangePercent = changePercent
        state.dataPoints = dps.reverse()
        state.isLoaded = true
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {setSelectedTab} = dashboardSlice.actions

export default dashboardSlice.reducer
