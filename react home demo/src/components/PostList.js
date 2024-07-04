import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostList = () => {
    const { boardId } = useParams();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get(`/api/boards/${boardId}/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, [boardId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const post = { title, content, board: { id: boardId } };
        axios.post('/api/posts', post)
            .then(response => {
                console.log('Post created:', response.data);
                setPosts([...posts, response.data]);
                setTitle('');
                setContent('');
            })
            .catch(error => console.error('Error creating post:', error));
    };

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostList;
