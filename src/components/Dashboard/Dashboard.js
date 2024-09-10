import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {fetchChartData} from "../../Reducers/dashboardSlice"
import DashboardTabs from "../Tabs/DashboardTabs"
import style from "./dashboard.module.scss"
import Header from "../Header/Header"
const Dashboard = () => {
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.dashboardReducer)
  useEffect(() => {
    dispatch(fetchChartData())
  }, [dispatch])

  const toggleFullScreen = () => {
    // Full screen logic goes here.
  }

  return (
    <div className={style.dashboardContainer}>
      {loading && (
        <>
          <Header />
          <DashboardTabs toggleFullScreen={toggleFullScreen} />
        </>
      )}
    </div>
  )
}

export default Dashboard
