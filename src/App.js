import React, { useState, useEffect } from "react";
import { Dropdown } from "./components/dropdown";
import { Head } from "./components/head";
import { Row } from "./components/row";

const URL = "currencies.json";
const WS_URL = "wss://api.zonda.exchange/websocket/";

const OrderBook = () => {
  const [activePair, setActivePair] = useState("BTC-PLN");
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [currencies, setCurrensies] = useState([]);
  const currency = ["EUR", "GBP", "USD", "USDT", "PLN"];

  let currencyArray = activePair.toUpperCase().split("-");

  useEffect(() => {
    const generatePairs = () => {
      let pairs = [];
      currencies.map((cur) =>
        currency.map((fiat) =>
          pairs.push(`${cur.displayName.toUpperCase()}-${fiat}`)
        )
      );
      setPairs(pairs);
    };

    generatePairs();
  }, [currencies]);

  useEffect(() => {
    setAsks([]);
    setBids([]);
    let subscribe = {
      action: "subscribe-public",
      module: "trading",
      path: `orderbook-limited/${activePair}/10`,
    };
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.action === "push") {
        const orders = response.message.changes;

        orders.forEach((_order) => {
          if (_order.action === "update") {
            const order = {
              rate: _order.state.ra,
              amount: _order.state.ca,
              value: _order.state.ra,
              offers: _order.state.co,
            };

            if (_order.entryType === "Sell") {
              setAsks((state) => [...state, order]);
            }

            if (_order.entryType === "Buy") {
              setBids((state) => [...state, order]);
            }
          }

          if (_order.action === "remove") {
            if (_order.entryType === "Buy") {
              setBids((state) =>
                state.filter((bid) => bid.rate !== _order.rate)
              );
            }

            if (_order.entryType === "Sell") {
              setAsks((state) =>
                state.filter((ask) => ask.rate !== _order.rate)
              );
            }
          }
        });
      }
    };

    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [activePair]);

  useEffect(() => {
    const apiCall = () => {
      fetch(URL)
        .then((data) => data.json())
        .then((data) => {
          const currencies = [];

          for (const [key, value] of Object.entries(data.currencies)) {
            currencies.push({
              name: key,
              fullName: value.fullName,
              displayName: value.displayName,
              img: value.img,
            });
          }

          setCurrensies((state) => [...currencies]);
        });
    };

    apiCall();
  }, []);

  const orderRows = (arr) =>
    arr &&
    arr.map((item, index) => <Row item={item} index={index} key={index} />);

  return (
    <div className="bg-neutral-800 text-white w-screen h-screen flex justify-center items-center flex-col">
      <Dropdown
        currencies={pairs}
        activePair={activePair}
        onClick={setActivePair}
      />

      <div className="flex w-full justify-center">
        <div className="border-4 border-neutral-800 w-2/5">
          <Head currencyArray={currencyArray} title={"Bids"} />
          {orderRows(bids.slice(1, 10).sort((a, b) => a.rate - b.rate))}
        </div>

        <div className="border-4 border-neutral-800  w-2/5">
          <Head currencyArray={currencyArray} title={"Asks"} />
          {orderRows(asks.slice(1, 10).sort((a, b) => a.rate - b.rate))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
