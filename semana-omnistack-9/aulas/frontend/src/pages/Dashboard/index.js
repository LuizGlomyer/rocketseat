import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';


import './styles.css';

export default function Dashboard( ){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() =>  // useMemo garante que a conexão não será refeita a menos que o id do usuário mude
        socketio('http://localhost:3333', { transports : ['websocket'], query: { user_id } }, {     // segundo parâmetro para tratar o erro No 'Access-Control-Allow-Origin' header is present on the requested resource.
    }), [user_id]); 

    useEffect(() => {
        console.log(user_id);
        socket.on('booking_request', data => { // ao receber uma requisição referente a uma reserva
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    // executa caso as variáveis de dentro do array sofram alteração
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            console.log(response);
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id !== id));
        // mudando o estado das requests, removemos a resquest cujo id está sendo processado
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }

    // a iteração deve conter elementos únicos, então informamos uma chave no primeiro elemento do loop
    // inserção de estilos pode ser feita com {{}} 
    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}> </header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className='btn'>Cadastrar novo spot</button>
            </Link>
        </>
    );
}