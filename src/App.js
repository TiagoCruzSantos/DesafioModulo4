import React, { useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])


  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
    setRepositories([...repositories, res.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter((rep) => rep.id !== id))
  }

  useEffect(() => {
    api.get('/repositories').then((res) => {
      setRepositories(res.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep) => (<li key={rep.id}>
          {rep.title}

          <button onClick={() => handleRemoveRepository(rep.id)}>
            Remover
          </button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
