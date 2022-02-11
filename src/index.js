import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { Dropdown, Button } from "react-bootstrap";

import "./styles.css";

const list = [
  {
    id: 1,
    name: "🧒🏻 Mans",
    state: "✨ Mansourah",
    city: "👑 mit-taref",
    live: "🪖 October"
  },
  {
    id: 2,
    name: "🧒🏻 Ahmed",
    state: "✨ Mansourah",
    city: "👰🏻 Salhat",
    live: "🚂 New October"
  },
  {
    id: 3,
    name: "🧒🏻 Amr",
    state: "✨ Mansourah",
    city: "🦡 Darksa",
    live: "🪖 October"
  },
  {
    id: 4,
    name: "🧒🏻 Khaled",
    state: "🌊 Alex",
    city: "🏄️ Sedi-beshr",
    live: "🪖 October"
  },
  {
    id: 5,
    name: "🧒🏻 Wezza",
    state: "🗿 Giza",
    city: "☘️ Hawamdiah",
    live: "🪖 October"
  },
  {
    id: 6,
    name: "🧒🏻 Mn3m",
    state: "✨ Mansourah",
    city: "⛓️ Mit-Salsel",
    live: "🪖 October"
  },
  {
    id: 7,
    name: "🧒🏻 Hana",
    state: "✨ Alex",
    city: "🏄️ Sedi-beshr",
    live: "🚂 New October"
  },
  {
    id: 8,
    name: "🧒🏻 Salah",
    state: "🗿 Giza",
    city: "🦡 Darksa",
    live: "🚂 New October"
  },
  {
    id: 9,
    name: "🧒🏻 Khaled",
    state: "✨ Mansourah",
    city: "⛓️ Mit-Salsel",
    live: "🪖 October"
  }
];
const initVal = [];
const initFilters = {
  name: initVal,
  state: initVal,
  live: initVal
};

const getUnique = (listOfObj = [{}], obj) => {
  let uniArr = [];
  let uniStr = [];

  listOfObj.forEach((item) => {
    if (obj === "name") {
      uniArr.push(Object.values(item.name));
    } else if (obj === "state") {
      uniArr.push(Object.values(item.state));
    } else if (obj === "live") {
      uniArr.push(Object.values(item.live));
    }
  });
  uniArr.forEach((item) => uniStr.push(item.join("")));
  const setted = new Set(uniStr);

  return Array.from(setted);
};

const Person = (props) => {
  const { name, state, city, live } = props.data;
  return (
    <div className="container">
      <p>{name}</p>
      <p>{state}</p>
      <p>{city}</p>
      <p>{live}</p>
    </div>
  );
};

const Downlist = (props) => {
  const { filtered, filters, setFilters } = props;

  const handleSelectName = (eventKey) => {
    setFilters({
      ...filters,
      name: [eventKey]
    });
  };
  const handleSelectState = (eventKey) => {
    setFilters({
      ...filters,
      state: [eventKey]
    });
  };
  const handleSelectLive = (eventKey) => {
    setFilters({
      ...filters,
      live: [eventKey]
    });
  };
  return (
    <Fragment>
      {/* names list */}
      <Dropdown onSelect={handleSelectName}>
        <Dropdown.Toggle variant={"primary"} id="dropdown-basic">
          {filters.name.length === 0 ? "Choose a name" : filters.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {getUnique(list, "name").map((item) => (
            <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* state list */}
      <Dropdown onSelect={handleSelectState}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {filters.state.length === 0 ? "Choose a state" : filters.state}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {getUnique(filtered, "state").map((item) => (
            <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* live list  */}
      <Dropdown onSelect={handleSelectLive}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filters.live.length === 0 ? "Choose a live" : filters.live}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {getUnique(filtered, "live").map((item) => (
            <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

function App() {
  const [filters, setFilters] = useState(initFilters);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const nameApplied = filters.name.length === 0 ? false : true;
    const stateApplied = filters.state.length === 0 ? false : true;
    const liveApplied = filters.live.length === 0 ? false : true;

    // Case 1 None
    if (!nameApplied && !stateApplied && !liveApplied) {
      setFiltered(list);
    }
    // Case 2 => Name Only
    else if (nameApplied && !stateApplied && !liveApplied) {
      const filterResults = list.filter((object) =>
        filters["name"].some((key) => object.name === key)
      );
      setFiltered(filterResults);
    }
    // Case 3 => State Only
    else if (!nameApplied && stateApplied && !liveApplied) {
      const filterResults = list.filter((object) =>
        filters["state"].some((key) => object.state === key)
      );
      setFiltered(filterResults);
    }
    // Case 4 => Live Only
    else if (!nameApplied && !stateApplied && liveApplied) {
      const filterResults = list.filter((object) =>
        filters["live"].some((key) => object.live === key)
      );
      setFiltered(filterResults);
    }
    // Case 5 => Name & State
    else if (nameApplied && stateApplied && !liveApplied) {
      const filterResults = list.filter(
        (object) =>
          filters["name"].some((key) => object.name === key) &&
          filters["state"].some((key) => object.state === key)
      );
      setFiltered(filterResults);
    }
    // Case 6 => Name & Live
    else if (nameApplied && !stateApplied && liveApplied) {
      const filterResults = list.filter(
        (object) =>
          filters["name"].some((key) => object.name === key) &&
          filters["live"].some((key) => object.live === key)
      );
      setFiltered(filterResults);
    }
    // Case 7 => State & Live
    else if (!nameApplied && stateApplied && liveApplied) {
      const filterResults = list.filter(
        (object) =>
          filters["state"].some((key) => object.state === key) &&
          filters["live"].some((key) => object.live === key)
      );
      setFiltered(filterResults);
    }
    // Case 8 => All Applied
    else if (nameApplied && stateApplied && liveApplied) {
      const filterResults = list.filter(
        (object) =>
          filters["name"].some((key) => object.name === key) &&
          filters["state"].some((key) => object.state === key) &&
          filters["live"].some((key) => object.live === key)
      );
      setFiltered(filterResults);
    }

    return () => setFiltered(initFilters);
  }, [filters]);

  return (
    <Fragment>
      <Downlist filtered={filtered} setFilters={setFilters} filters={filters} />
      <Button onClick={() => setFilters(initFilters)} variant="danger">
        {"Reset 🕳️😬!"}
      </Button>
      {filtered.length === 0 ? (
        <p>No Matchs</p>
      ) : (
        filtered.map((item) => <Person data={item} />)
      )}
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

/* ✅❌
// Case 1 => None         ✅ 
// Case 2 => Name Only    ✅
// Case 3 => State Only   ✅
// Case 4 => Live Only    ✅
// Case 5 => Name & State ✅
// Case 6 => Name & Live  ✅
// Case 7 => State & Live ✅
// Case 8 => All          ✅
  */
