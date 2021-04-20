import './App.css';
import React, { useEffect, useState } from "react";
import { Form, Pagination, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [filterLeg, setFilterLeg] = useState(false);
  const [pokemonlist, setPokemonList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    var endpoint;
    if (filterLeg) {
      endpoint = `http://localhost:3001/pokemon/?page=${page}&legendary=true`;
    } else {
      endpoint = `http://localhost:3001/pokemon/?page=${page}`;
    }
    axios.get(endpoint).then((res) => {
      console.log('res = ', res);
      const data = res.data;
      if (data.isSuccess) {
        setPokemonList(data.data);
        setTotal(data.total);
      } else {
        setPokemonList([])
      }
    });
  }, [page]);

  return (
    <div className="App">
      <div className="container mt-5">
        <div>
          <h3>Pokemon</h3>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Filter Legendary"
            value={filterLeg}
            onChange={() => {
              setFilterLeg(!filterLeg);
              setPage(1);
            }}
          />
        </div>
        <Table striped bordered hover size="sm">
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type 1</th>
            <th>Type 2</th>
            <th>Total</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Sp. Atk</th>
            <th>Sp. Def</th>
            <th>Speed</th>
            <th>Generation</th>
            <th>Legendary</th>
          </tr>
          </thead>
          <tbody>
          {pokemonlist.map((item, index) => (
            <tr key={`pokemon_${index}`}>
              <td>{index + 1 + (page - 1) * 20}</td>
              <td>{item.name}</td>
              <td>{item.type1}</td>
              <td>{item.type2}</td>
              <td>{item.total}</td>
              <td>{item.hp}</td>
              <td>{item.attack}</td>
              <td>{item.defense}</td>
              <td>{item.sp_atk}</td>
              <td>{item.sp_def}</td>
              <td>{item.speed}</td>
              <td>{item.generation}</td>
              <td>{item.legendary}</td>
            </tr>
          ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next disabled={page * 20 >= total} onClick={() => setPage(page + 1)} />
          <Pagination.Last disabled={page * 20 >= total} onClick={() => setPage(parseInt(total / 20))} />
        </Pagination>
      </div>
    </div>
  );
}

export default App;
