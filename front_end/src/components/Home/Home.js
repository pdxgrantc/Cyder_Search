import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import Header from '../Header/Header'

export default function Home() {
    return (
        <div className='max-w-screen min-h-screen text-small bg-dark_grey text'>
            <Helmet>
                <title>Cyder Search</title>
            </Helmet>
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
    const [name, setName] = useState('')
    const [useName, setUseName] = useState(false)
    const [fqdn, setFqdn] = useState('')
    const [useFqdn, setUseFqdn] = useState(false)
    const [ctnr, setCtnr] = useState("'i:ctnr__contains':'/70/'")
    const [poNumber, setPoNumber] = useState('')
    const [usePoNumber, setUsePoNumber] = useState(false)
    const [serialNumber, setSerialNumber] = useState('')
    const [useSerialNumber, setUseSerialNumber] = useState(false)
    const [location, setLocation] = useState('')
    const [useLocation, setUseLocation] = useState(false)
    const [hardwareType, setHardwareType] = useState('')
    const [useHardwareType, setUseHardwareType] = useState(false)

    // static interface features
    const [ipAddr, setIpAddr] = useState('')
    const [useIP, setUseIP] = useState(false)
    const [macAddr, setMacAddr] = useState('')
    const [useMac, setUseMac] = useState(false)

    const handleCtnrChange = (event) => {
        setCtnr(event.target.value)
    };

    function validateAndFormatMacAddress(input) {
        // Remove any existing colons and convert to uppercase
        const sanitizedInput = input.replace(/:/g, '').toUpperCase();

        // Check if the input has exactly 12 hexadecimal characters
        if (!/^[0-9A-F]{12}$/i.test(sanitizedInput)) {
            return '';
        }

        // Insert colons after every 2 characters
        const formattedMacAddress = sanitizedInput.replace(/(.{2})/g, '$1:');

        // Remove the trailing colon at the end
        return formattedMacAddress.slice(0, -1);
    }


    const ClearForm = () => {
        setName('')
        setCtnr("'i:ctnr__contains':'/70/'")
        setPoNumber('')
        setSerialNumber('')
        setLocation('')
        setHardwareType('')
        setIpAddr('')
        setMacAddr('')
        setUseName(false)
        setUseFqdn(false)
        setUsePoNumber(false)
        setUseSerialNumber(false)
        setUseLocation(false)
        setUseHardwareType(false)
        setUseIP(false)
        setUseMac(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // validate and format mac address
        const formattedMacAddress = validateAndFormatMacAddress(macAddr)
        setMacAddr(formattedMacAddress)

        const data = {
            name: name,
            useName: useName,
            ctnr: ctnr,
            poNumber: poNumber,
            usePoNumber: usePoNumber,
            serialNumber: serialNumber,
            useSerialNumber: useSerialNumber,
            location: location,
            useLocation: useLocation,
            hardwareType: hardwareType,
            useHardwareType: useHardwareType,
            ipAddr: ipAddr,
            useIP: useIP,
            macAddr: formattedMacAddress,
            useMac: useMac
        }

        // send to server at /api/search
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            // then if 200 response, clear form
        }).then((response) => {
            if (response.status === 200) {
                ClearForm()
            }
        }
        )
    }


    return (
        <form className='flex flex-col gap-2 text-black'>
            <div className='flex gap-4'>
                <label className='text outline-none' htmlFor="selectOption">Container: </label>
                <select className='rounded px-[.5rem] py-[.25rem]' id="selectOption" value={ctnr} onChange={handleCtnrChange}>
                    <option value="'/70/'">Forestry</option>
                    <option value="">All</option>
                </select>
            </div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='useName'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={useName}
                        onChange={(e) => setUseName(e.target.checked)}
                        id="useName"
                    />
                </div>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="PO Number"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    id="poNumber"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='usePoNumber'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={usePoNumber}
                        onChange={(e) => setUsePoNumber(e.target.checked)}
                        id="usePoNumber"
                    />
                </div>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="Serial Number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    id="serialNumber"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='useSerialNumber'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={useSerialNumber}
                        onChange={(e) => setUseSerialNumber(e.target.checked)}
                        id="useSerialNumber"
                    />
                </div>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='useLocation'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={useLocation}
                        onChange={(e) => setUseLocation(e.target.checked)}
                        id="useLocation"
                    />
                </div>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="Hardware Type"
                    value={hardwareType}
                    onChange={(e) => setHardwareType(e.target.value)}
                    id="hardwareType"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='useHardwareType'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={useHardwareType}
                        onChange={(e) => setUseHardwareType(e.target.checked)}
                        id="useHardwareType"
                    />
                </div>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="IP Address"
                    value={ipAddr}
                    onChange={(e) => setIpAddr(e.target.value)}
                    id="ipAddr"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='useIP'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={useIP}
                        onChange={(e) => setUseIP(e.target.checked)}
                        id="useIP"
                    />
                </div>
                <input
                    type='text'
                    className='outline-none w-auto h-[2rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                    placeholder="MAC Address"
                    value={macAddr}
                    onChange={(e) => setMacAddr(e.target.value)}
                    id="macAddr"
                />
                <div className='flex gap-2 h-fit'>
                    <label
                        htmlFor='useMac'
                        className='text-white text-small'
                    >
                        Use Empty String:
                    </label>
                    <input
                        type='checkbox'
                        className='w-[1rem] my-auto h-[1rem] rounded bg-input_bg_color text-text_white px-[.5rem] py-[.5rem] text-small'
                        checked={useMac}
                        onChange={(e) => setUseMac(e.target.checked)}
                        id="useMac"
                    />
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='font-semibold w-auto h-auto rounded bg-button_orange hover:bg-button_orange_hover hover:text-black text px-[.5rem] py-[.15rem] hover:px-[1.25rem]'
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
