import React from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/button';
export function Home() {
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
          <button className='creat-room'>
            <img src={googleImg} alt='' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Digite o código de uma sala' />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}