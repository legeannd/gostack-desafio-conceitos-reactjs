import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  //Função useEffect é utilizada para carregar os dados da API pela primeira vez 

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  //A função handleAddRepository manda pro backend o objeto com os dados necessários pra criação do repositório
  //Quando o método post retorna uma resposta, ela é usada para atualizar o frontend com o novo repositório adicionado

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      "title": `Novo repositório ${Date.now()}`,
      "owner": "Gean Lucas"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    
  }

  //A função handleRemoveRepository recebe o id do repositório e manda para o backend através da rota delete
  //Quando o objeto é removido, ele é buscado no array de repositórios que está no frontend, para ser removido e a tela ser atualizada

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  //Cada <li> possui um botão para remover o repositório, e é gerado automaticamente conforme o botão de adicionar vai sendo clicado

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
