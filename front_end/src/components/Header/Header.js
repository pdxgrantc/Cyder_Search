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

                <div className='flex'>
                    <Link to='/' className='flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold'>
                        {window.location.pathname === '/' ? (
                            <>
                                <p className='text-small text-white'>Dashboard</p>
                            </>
                        ) : (
                            <>
                                <p className='text-small'>Dashboard</p>
                            </>
                        )}
                    </Link>
                    <Link to='/transactions' className='flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold'>
                        {window.location.pathname === '/transactions' ? (
                            <>
                                <p className='text-small text-white'>Transactions</p>
                            </>
                        ) : (
                            <>
                                <p className='text-small'>Transactions</p>
                            </>
                        )}
                    </Link>
                    <Link to='/income' className='flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold'>
                        {window.location.pathname === '/income' ? (
                            <>
                                <p className='text-small text-white'>Income</p>
                            </>
                        ) : (
                            <>
                                <p className='text-small'>Income</p>
                            </>
                        )}
                    </Link>
                </div>
            </div>
            <div className='w-[3rem]'></div>
        </div>
    )
}

