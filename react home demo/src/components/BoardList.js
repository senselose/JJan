import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardList = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get('/api/boards')
            .then(response => {
                setBoards(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the boards!', error);
            });
    }, []);

    return (
        <div>
            <h1>Board List</h1>
            <ul>
                {boards.map(board => (
                    <li key={board.id}>
                        <h2>{board.title}</h2>
                        <p>{board.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;
