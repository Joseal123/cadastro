import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

// Componentes: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAi passa para o componente FILHO
// Estado: Informação mantidas elo componente (Lembrar : imutabilidade)


function App() {

    const [devs, setDevs] = useState([]);

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
      async function loadDevs(){
        const response  = await api.get('/devs');
        
        setDevs(response.data);

      }
      loadDevs();
    }, []);



    async function handleAddDev(e){
      e.preventDefault();
      
      const response = await api.post('./devs', {
        name,
        cpf,
        email,
        telephone,

      })
        setName('');
        setCpf('');
        setEmail('');
        setTelephone('');
        setPassword('');

        setDevs({...devs, response});

    }

 
  return( 
  <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleAddDev}>
        <div class="input-block">
          <label htmlFor="name">Nome</label>
          <input 
           name="nome"
           id="name" 
           required
           value={name}
           onChange={e => setName(e.target.value)}
           />
        </div>

        <div class="input-block">
          <label htmlFor="cpf">CPF</label>
          <input 
            cpf="CPF"
            id="cpf" 
            required
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            />
        </div>

        <div class="input-block">
          <label htmlFor="email">Email</label>
          <input 
            email="email" 
            id="email" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div class="input-block">
          <label htmlFor="telephone">Telefone</label>
          <input 
            telephone="telefone" 
            id="telephone" 
            required
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            />
        </div>

        <div class="input-block">
          <label htmlFor="password">Senha</label>
          <input 
          password="seha" 
          id="password" 
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        </div>

        
        
        <button type="submit">Cadastrar</button>

      </form>
    </aside>
    <main>
      <ul>
        {devs.map(dev => (
          <li className="dev-item">
          <header>
           <div className="user-info">
             <strong>{dev.name}</strong>
             <span>{dev.cpf}</span>
             <p>{dev.email}</p>
             <a>{dev.telephone}</a>
           </div>
          </header>
        </li>
        ))}
        
      </ul>
    </main>
  </div>
 
    );
}
export default App;
