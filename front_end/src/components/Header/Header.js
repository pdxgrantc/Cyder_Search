import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Desktop(props) {
    const [title, setTitle] = useState('Cyder Search')

    useEffect(() => {
        if (props.title) {
            setTitle(props.title)
        }
    }, [props.title])


    return (
        <div className='w-full min-h-[80px] bg-black flex'>
            <div className='w-[5rem]'></div>
            <div className='flex justify-between w-full'>
                <Link to='/' >
                    <h1 className='align-middle text-lheader font-bold text'>{title}</h1>
                </Link>
            </div>
            <div className='w-[3rem]'></div>
        </div>
    )
}

