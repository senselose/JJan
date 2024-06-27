import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResultPage = () => {
    const { keyword } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`/api/search/${keyword}`)
            .then(response => response.json())
            .then(data => setResults(data));
    }, [keyword]);

    return (
        <div>
            <h1>검색 결과 : {keyword}</h1>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultPage;
