import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'react-bootstrap';

import './styles.css';

const list = [
  {
    id: 1,
    name: '🧒🏻 Mans',
    state: '✨ Mansourah',
    city: '👑 mit-taref',
    live: '🪖 October',
  },
  {
    id: 2,
    name: '🧒🏻 Ahmed',
    state: '✨ Mansourah',
    city: '👰🏻 Salhat',
    live: '🚂 New October',
  },
  {
    id: 3,
    name: '🧒🏻 Amr',
    state: '✨ Mansourah',
    city: '🦡 Darksa',
    live: '🪖 October',
  },
  {
    id: 4,
    name: '🧒🏻 Khaled',
    state: '🌊 Alex',
    city: '🏄️ Sedi-beshr',
    live: '🪖 October',
  },
  {
    id: 5,
    name: '🧒🏻 Wezza',
    state: '🗿 Giza',
    city: '☘️ Hawamdiah',
    live: '🪖 October',
  },
  {
    id: 6,
    name: '🧒🏻 Mn3m',
    state: '✨ Mansourah',
    city: '⛓️ Mit-Salsel',
    live: '🪖 October',
  },
];

const getUnique = (listOfObj = [{}], obj) => {
  let uniArr = [];
  let uniStr = [];

  listOfObj.forEach((item) => {
    if (obj === 'name') {
      uniArr.push(Object.values(item.name));
    } else if (obj === 'state') {
      uniArr.push(Object.values(item.state));
    } else if (obj === 'live') {
      uniArr.push(Object.values(item.live));
    }
  });
  uniArr.forEach((item) => uniStr.push(item.join('')));
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
  const data = props.data;
  console.log(props);
  console.log(props.data);
  console.log(data);

  return (
    <Fragment>
      {/* names list */}
      <Dropdown
        onSelect={(eventKey) => console.log(eventKey)}
      >
        <Dropdown.Toggle
          variant={'primary'}
          id="dropdown-basic"
        >
          Choose Name
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {getUnique(data, 'name').map((item) => (
            <Dropdown.Item eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* state list */}
      <Dropdown
        onSelect={(eventKey) => console.log(eventKey)}
      >
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
        >
          Choose state
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {getUnique(data, 'state').map((item) => (
            <Dropdown.Item eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* live list  */}
      <Dropdown
        onSelect={(eventKey) => console.log(eventKey)}
      >
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
        >
          Choose live
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {getUnique(data, 'live').map((item) => (
            <Dropdown.Item eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

const getStr = (value = '') => value.toLowerCase();

function App() {
  const [filters, setFilters] = useState({
    name: ['beauty', 'home', 'women'],
    state: ['oneDollar', 'twoDollar'],
    live: ['new-york'],
  });
  const [filtered, setFiltered] = useState([]);

  const name1 = list.filter((item) =>
    filters.name.some((key) => item[key])
  );
  const state1 = list.filter((item) =>
    filters.state.some((key) => item[key])
  );
  const live1 = list.filter((item) =>
    filters.live.some(
      (value) =>
        getStr(value) === getStr(item.nearestLocation)
    )
  );

  useEffect(() => {
    if (
      Object.values(filters).every((a) => a.length === 0)
    ) {
      setFiltered(list);
    } else if (
      filters.name.length > 0 &&
      filters.state.length === 0
    ) {
      const filterResults = list.filter((object) =>
        filters['name'].some((key) => object[key])
      );
      setFiltered(filterResults);
    } else if (
      filters.state.length > 0 &&
      filters.name.length === 0
    ) {
      const filterResults = list.filter((object) =>
        filters['state'].some((key) => object[key])
      );
      setFiltered(filterResults);
    } else if (
      filters.name.length > 0 &&
      filters.state.length > 0
    ) {
      const filterResults = list.filter(
        (object) =>
          filters['name'].some((key) => object[key]) &&
          filters['state'].some((key) => object[key])
      );
      setFiltered(filterResults);
    }
  });

  return (
    <Fragment>
      <Downlist data={list} />
      {list.map((item) => (
        <Person data={item} />
      ))}
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
