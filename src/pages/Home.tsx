import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

import '../styles/auth.scss';

import { Button } from '../components/Button';



export function Home() {
  const [roomCode, setRoomCode] = useState('');
  
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault(); // Bloqueia funções default da tag form

    const roomRef = await database.ref(`rooms/${roomCode}`).get(); // Busca no banco de dados uma sala com esse código

    if(!roomRef.exists()){ // Se existe uma sala com esse código então faça...
      alert('Sala não existe.');
      return;

    }

    history.push(`/rooms/${roomCode}`); // Redireciona usuário para pagina da sala

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
          
          <button onClick={handleCreateRoom} className='creat-room'>
            <img src={googleImg} alt='' />
            Crie sua sala com o Google
          </button>
          
          <div className='separator'>ou entre em uma sala</div>
          
          <form onSubmit={handleJoinRoom}>
            <input 
            type='text' 
            placeholder='Digite o código de uma sala'
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode} />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    
    </div>
  );
}
