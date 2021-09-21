import {FormEvent, useState} from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import {Link, useHistory} from 'react-router-dom'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';




export function NewRoom() {

  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  const {user} = useAuth();

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault(); // Remove todos os eventos default da tag form

    // trim() remove todos os espacos da string
    if(newRoom.trim() === ''){
      return;
    }

    // ref() faz referencia a um dado dentro de um banco de dados
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({ // Cria uma nova sala no banco de dados
      title: newRoom,
      authorId: user?.id,
    })

    /**
     * @argument firebaseRoom.key -> identificador da sala criada
     * 
     */
    history.push(`/rooms/${firebaseRoom.key}`); // Redireciona usuário para a sala criada

  };







  return (
    <div id='page-auth'>
      
      <aside>
        <img src={illustrationImg} alt='Ilustracão de perguntas e respostas' />
        <strong>Cire salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      
      <main>
      
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input 
            type='text' 
            placeholder='Nome da sala'
            onChange={event => setNewRoom(event.target.value)} 
            value={newRoom}/>
            <Button type='submit'>Criar sala</Button>
          </form>
          
          <p>
            Quer entrar em uam sala existente? <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      
      </main>
    
    </div>
  );
}
