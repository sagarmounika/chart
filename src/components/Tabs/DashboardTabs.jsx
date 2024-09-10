import React from "react"
import {Tabs, TabList, Tab, TabPanel} from "react-tabs"
import {useSelector, useDispatch} from "react-redux"
import {setSelectedTab} from "../../Reducers/dashboardSlice"
import Chart from "../ChartWrapper/Chart"
import Summary from "../Summary/Summary"
import Analytics from "../Analytics/Analytics"
import style from "./tabs.module.scss"
import Statistics from "../Statistics/Statistics"
const DashboardTabs = ({toggleFullScreen}) => {
  const dispatch = useDispatch()

  const {


    selectedTab,
  } = useSelector(state => state.dashboardReducer)
  return (
    <div className={style.tabContainer}>
      <Tabs
        id="controlled-tabs"
        selectedIndex={selectedTab}
        onSelect={tabIndex => dispatch(setSelectedTab(tabIndex))}
      >
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Chart</Tab>
          <Tab>Statistics</Tab>
          <Tab>Analysis</Tab>
        </TabList>

        <TabPanel>
          <Summary />
        </TabPanel>

        <TabPanel>
          <Chart toggleFullScreen={toggleFullScreen} />
        </TabPanel>

        <TabPanel>
          <Statistics />
        </TabPanel>

        <TabPanel>
          <Analytics />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default DashboardTabs
