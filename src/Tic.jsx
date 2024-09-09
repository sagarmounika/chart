import React, {useState} from "react"

const Tic = () => {
  const [turn, setTurn] = useState("X")
  const [winner, setWinner] = useState()
  const [isDraw, setIsDraw] = useState(false)
  const [cells, setCells] = useState(Array(9).fill(""))
  const handleClick = num => {
    if (winner || cells[num] !== "") return
    let arr = [...cells]
    if (turn === "X") {
      arr[num] = "X"
      setTurn("O")
    } else {
      arr[num] = "0"
      setTurn("X")
    }
    checkWinner(arr)
    setCells(arr)
    if (!arr.includes("") && !winner) {
      setIsDraw(true)
    }
  }
  const checkWinner = arr => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    }
    for (let combo in combos) {
      combos[combo].forEach(pattern => {
        if (
          arr[pattern[0]] === "" ||
          arr[pattern[1]] === "" ||
          arr[pattern[2]] === ""
        ) {
        } else if (
          arr[pattern[0]] === arr[pattern[1]] &&
          arr[pattern[1]] === arr[pattern[2]]
        ) {
          setWinner(arr[pattern[0]])
        }
      })
    }
  }
  const Cell = ({num}) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>
  }
  return (
    <div className="container">
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Tic
