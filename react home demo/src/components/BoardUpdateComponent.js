import React, { useState, useEffect } from 'react';
import BoardService from './BoardService';
import { useParams } from 'react-router-dom';

const BoardUpdateComponent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    BoardService.getBoardById(id).then(response => {
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
    const board = { title, content };
    BoardService.updateBoard(id, board).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <h2>Update Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <input
            type="text"
            value={content}
            onChange={event => setContent(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BoardUpdateComponent;
