import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [recentKeywords, setRecentKeywords] = useState([]);
    const [showRecent, setShowRecent] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        fetchRecentKeywords();
    }, []);

    const fetchRecentKeywords = async () => {
        try {
            const response = await axios.get('/api/search/recent');
            setRecentKeywords(response.data);
        } catch (error) {
            console.error('Failed to fetch recent keywords:', error);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/search', null, { params: { keyword } });
            fetchRecentKeywords();
            setKeyword(''); // 검색 후 입력창 비우기
            setShowRecent(false); // 검색 후 최근 검색어 목록 숨기기
        } catch (error) {
            console.error('Failed to save keyword:', error);
        }
    };

    const handleFocus = () => {
        setShowRecent(true);
    };

    const handleBlur = (e) => {
        // 최근 검색어 목록 클릭 시 목록이 사라지는 것을 방지
        if (inputRef.current && !inputRef.current.contains(e.relatedTarget)) {
            setShowRecent(false);
        }
    };

    const handleRecentClick = (keyword) => {
        setKeyword(keyword);
        setShowRecent(false);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Search..."
                    ref={inputRef}
                />
                <button type="submit">Search</button>
            </form>
            {showRecent && (
                <div tabIndex="0" onBlur={handleBlur}>
                    <h3>Recent Searches</h3>
                    <ul>
                        {recentKeywords.map((item) => (
                            <li key={item.id} onClick={() => handleRecentClick(item.keyword)}>
                                {item.keyword}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
