import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { func } from "prop-types";

function Btn({ text, changeText }) {
  return (
    <button
      onClick={changeText}
      style={{
        margin: "0px 10px",
        padding: "10px 20px",
        backgroundColor: "tomato",
        border: "10px",
        borderRadius: "5px",
      }}
    >
      {text}
    </button>
  );
}

function App() {
  const [loading, setLoading] = useState("true");
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState(1);
  const [selected, setSelected] = useState(1);
  const [showing, setShowing] = useState(false);
  const [text, setText] = useState("submit");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChangePay = (e) => {
    setValue(e.target.value);
  };
  const onChangeSelected = (e) => {
    setSelected(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setShowing((current) => !current);
  };
  const changeText = () => {
    text === "submit" ? setText("reset") : setText("submit");
    if (text === "reset") {
      setValue("1");
    }
  };
  //console.log(coins);
  return (
    <div>
      <h1>The Coins:({coins.length})</h1>
      {loading ? <strong>Loading....</strong> : null}
      <select
        onChange={onChangeSelected}
        style={{ padding: "10px", color: "white", backgroundColor: "black" }}
      >
        {coins.map((coin, index) => (
          <option
            key={index}
            value={coin.quotes.USD.price}
            style={{ color: "white" }}
          >
            {coin.name} : ${coin.quotes.USD.price}USD
          </option>
        ))}
      </select>
      <hr />
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangePay}
          value={value}
          style={{ padding: "20px 60px" }}
          type="value"
          placeholder="how much to exchange?"
        />
        <Btn text={text} changeText={changeText} />
      </form>
      {showing ? <div>you could buy {value / selected}</div> : null}
    </div>
  );
}

export default App;
