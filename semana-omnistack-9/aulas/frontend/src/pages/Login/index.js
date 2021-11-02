import React, { useState } from 'react';
import api from '../../services/api';

// O componente requer que seja retornado apenas um único elemento
// O react permite a criação de uma tag vazia (fragment) como retorno
// history serve para a navegação

export default function Login( {history} ){
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
        event.preventDefault(); // previne a atualização da página após a feita a submissão
        console.log(email);

        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        console.log(_id);

        localStorage.setItem('user', _id);

        history.push("/dashboard");
    }

    return (
        <>
            <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                type="email" 
                id="email" 
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            >
            </input>

            <button className="btn" type="submit">Entrar</button>

            </form>
        </>
    );
}