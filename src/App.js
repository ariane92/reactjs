import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    //setRepositories([...repositories, repositories]);

    const response = await api.post('repositories', {
      title: `Novo repo ${Date.now()}`,
      url: "ariane92.github.com",
	    techs: ["python, php"]

    })

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`);

     setRepositories(repositories.filter(
       repositorie => repositorie.id != id
     ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositorie => 
         <li key={repositorie.id}>{repositorie.title}<button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button></li>  
      )}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
