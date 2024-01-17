import React, {RefObject, useRef, DetailedHTMLProps, InputHTMLAttributes, useEffect} from 'react';

export const Test = () => {

    const re = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
        console.log(re.current)
    },[])


    return (
        <div>
            <form >
                <input ref={re} type="text"/>
                    <button onClick={()=> {



                    }}>asdsad</button>
            </form>

        </div>
    );
};

