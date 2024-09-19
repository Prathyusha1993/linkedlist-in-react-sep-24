import React, { useState } from 'react'
import useLRUCache from '../hooks/useLRUCache';

const DynamicContentLoader = () => {
    const [content, setContent] = useState([]);
    const {get, put} = useLRUCache(3);

    const loadContent = async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const loadedContent = {
            id,
            text: `Tab ${id} Data`
        };
        put(id, loadedContent);
        setContent((prev) => [...prev,loadedContent])
    };

    const handleButtonClick = (id) => {
        const cachedContent = get(id);
        if(cachedContent){
            console.log(`Content ${id} loaded from cache`);
            setContent((prev) => [...prev,cachedContent]);
        } else {
            console.log(`Loading content ${id}`);
            loadContent(id);
        }  
    };

  return (
    <div>
        <h3>Dynamic Content Loader with LRU Cache</h3>
        <button onClick={() => handleButtonClick(1)}>Tab 1</button>
        <button onClick={() => handleButtonClick(2)}>Tab 2</button>
        <button onClick={() => handleButtonClick(3)}>Tab 3</button>
        <button onClick={() => handleButtonClick(4)}>Tab 4</button>
        <button onClick={() => handleButtonClick(5)}>Tab 5</button>

        <div>
            <h3>Loaded Content</h3>
            <ul>{content.map((item, index) => (
                <li key={`${item.id}${index}`}>{item.text}</li>
            ))}</ul>
        </div>
    </div>
  )
}

export default DynamicContentLoader