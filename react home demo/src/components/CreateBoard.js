import React, { useState } from 'react';
import axios from 'axios';

const CreateBoard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/boards', { title, content })
            .then(response => {
                console.log('Board created successfully:', response.data);
                setTitle('');
                setContent('');
            })
            .catch(error => {
                console.error('There was an error creating the board!', error);
            });
    };

    return (
        <div>
            <h1>Create Board</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateBoard;
