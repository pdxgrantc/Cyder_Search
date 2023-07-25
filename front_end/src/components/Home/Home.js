import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import Header from '../Header/Header'

export default function Home() {
    return (
        <div className='max-w-screen min-h-screen text-small bg-bg text'>
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

    const validateAndFormatMacAddress = (input) => {
        // Remove any existing colons and convert to uppercase
        const sanitizedInput = input.replace(/:/g, '').toUpperCase();
      
        // Check if the input has exactly 12 hexadecimal characters
        if (!/^[0-9A-F]{12}$/i.test(sanitizedInput)) {
          return 'Invalid MAC address. It should have 12 hexadecimal characters (0-9, A-F).';
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

        setMacAddr(validateAndFormatMacAddress(macAddr))

        const data = {
            name: name,
            ctnr: ctnr,
            poNumber: poNumber,
            serialNumber: serialNumber,
            location: location,
            hardwareType: hardwareType,
            ipAddr: ipAddr,
            macAddr: macAddr,
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
            <div>
                <select className='rounded' id="selectOption" value={ctnr} onChange={handleCtnrChange}>
                    <option value="'i:ctnr__contains':'/70/'">Forestry</option>
                    <option value="">All</option>
                </select>
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={useName}
                    onChange={(e) => setUseName(e.target.checked)}
                    id="useName"
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="PO Number"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    id="poNumber"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={usePoNumber}
                    onChange={(e) => setUsePoNumber(e.target.checked)}
                    id="usePoNumber"
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="Serial Number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    id="serialNumber"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={useSerialNumber}
                    onChange={(e) => setUseSerialNumber(e.target.checked)}
                    id="useSerialNumber"
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={useLocation}
                    onChange={(e) => setUseLocation(e.target.checked)}
                    id="useLocation"
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="Hardware Type"
                    value={hardwareType}
                    onChange={(e) => setHardwareType(e.target.value)}
                    id="hardwareType"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={useHardwareType}
                    onChange={(e) => setUseHardwareType(e.target.checked)}
                    id="useHardwareType"
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="IP Address"
                    value={ipAddr}
                    onChange={(e) => setIpAddr(e.target.value)}
                    id="ipAddr"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={useIP}
                    onChange={(e) => setUseIP(e.target.checked)}
                    id="useIP"
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type='text'
                    className='w-[50vw] h-[2rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    placeholder="MAC Address"
                    value={macAddr}
                    onChange={(e) => setMacAddr(e.target.value)}
                    id="macAddr"
                />
                <input
                    type='checkbox'
                    className='w-[1rem] h-[1rem] rounded bg-input_bg_color text-text_white px-[1rem] py-[.5rem] text-small'
                    checked={useMac}
                    onChange={(e) => setUseMac(e.target.checked)}
                    id="useMac"
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
