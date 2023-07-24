import React, { useState } from 'react'

import Header from '../Header/Header'

export default function Home() {
    return (
        <div className='max-w-screen min-h-screen text-small bg-bg text'>
            <Header />
            <div className='h-[2rem]'></div>
            <div className="mx-[5rem] rounded bg-black py-[2rem] px-[4rem]">
                <div className='items-baseline h-fit'>
                    <Input />
                </div>
            </div>
        </div>
    )
}


function Input() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [fqdn, setFqdn] = useState('')
    const [ctnr, setCtnr] = useState('')

    const handleCtnrChange = (event) => {
        setCtnr(event.target.value)
    };

    const ClearForm = () => {
        setId('')
        setName('')
        setFqdn('')
        setCtnr('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = {
            id: id,
            name: name,
            fqdn: fqdn,
            ctnr: ctnr
        }

        console.log(data)

        // send to server at /api/search
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                ClearForm()
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );
    }


    return (
        <form className='flex flex-col gap-2 text-black'>
            <div>
                <select id="selectOption" value={ctnr} onChange={handleCtnrChange}>
                    <option value="">Not Specified</option>
                    <option value="'i:ctnr__contains':'/70/'">Forestry</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    id="id"
                />
            </div>
            <div>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                />
            </div>
            <div>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="Full Domain Name"
                    value={fqdn}
                    onChange={(e) => setFqdn(e.target.value)}
                    id="fqdn"
                />
            </div>
            <div>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='w-[50vw] h-[2rem] rounded bg-button_accent_color text-text_white px-[1rem] py-[.5rem] text-small'
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
