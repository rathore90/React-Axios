import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function Articles(){
  const default_url = 'https://hn.algolia.com/api/v1/search?query=redux';
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(default_url);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
    setIsLoading(true);
    const result = await axios(
      `https://hn.algolia.com/api/v1/search?query=${query}`,
    );
    setData(result.data);
    setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return(
    <Fragment>
      <input
        type="text"
        onChange={event => setQuery(event.target.value)}
      />
      
      <button type="button" onClick={() => setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)}>
        Search
      </button>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default Articles;