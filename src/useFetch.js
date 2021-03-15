import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCount = new AbortController();
        
        fetch(url, {signal: abortCount.signal})
            .then(res => {
                if(!res.ok) {
                    throw Error("Could Not Fetch the Data");
                }
                return res.json();
            })
            .then(data => {
                setError(null);
                setData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                if(error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    setError(error.message);
                    setIsLoading(false);
                }
            });
            
        return () => {
            abortCount.abort();
        }
    }, [url]);

    return {data, isLoading, error};
};

export default useFetch;