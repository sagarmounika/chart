import React from 'react'
import style from "./header.module.scss"
import {useSelector} from "react-redux"
const Header = () => {
    const {

      currentPrice,
      priceChange,
      priceChangePercent
    } = useSelector(state => state.dashboardReducer)
  return (
    <div className={style.header}>
      <div className={style.price}>
        <span>{currentPrice}</span>
        <span className={style.symbol}>₹</span>
      </div>
      <div
        className={style.change}
        style={{color: priceChange >= 0 ? "#67BF6B" : "red"}}
      >
        {priceChange >= 0 ? "+" : "-"}
        {Math.abs(priceChange)} ({priceChangePercent}%)
      </div>
    </div>
  )
}

export default Header