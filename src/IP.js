// ./src/IP.js
import React, {useState, useEffect, useRef} from 'react';
import {get} from './api/ipProvider';

function IP() {
    const isMounted = useRef(false);
    const [ip, setIp] = useState(null);

    useEffect(() => {
        isMounted.current = true;
        get().then(data => {
            if(isMounted.current) setIp(() => data.ip);
        });
        return () => isMounted.current = false;
    }, []);

    function handleClick() {
        setIp(null);
        get().then(data => {
            if(isMounted.current) setIp(() => data.ip);
        });
    }
    
    if(ip === null) return <p>Loading...</p>

    return <section>
        <h1>{ ip }</h1>
        <button onClick={handleClick}>refresh</button>
    </section>
}

export default IP;