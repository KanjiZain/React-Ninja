import { useState, useEffect } from "react";

const useFetch = (url) => { 
    const [data, setData] = useState(null);
    const [ispending, setispending] = useState(true);
    const [error,seterror] = useState(null)

 useEffect(() => {

    const abortCont = new AbortController();
     
        setTimeout(() => {
            fetch(url, {signal: abortCont.signal} )
                .then(res => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error('Could Not Fetch Data!')
                    }
                    return res.json();
                })
                .then(data => {
                    console.log('Data fetched')
                    console.log(data)
                    setData(data);
                    setispending(false);
                    seterror(null)
                })
                .catch(err => {
                    if(err.name === 'AbortError') {
                        console.log('Abort Error')
                    }
                    else {
                        seterror(err.message)
                        setispending(false);
                    }
                })
        }, 500);
        return () => abortCont.abort();
    }, [url])
    return{data , ispending, error}
}

export default useFetch;