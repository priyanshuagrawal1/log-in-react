import React from 'react'

export const Input = (props) => {
    let label = props.label;
    return (
        <>
            <label>{label}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' className='login__input' />
        </>
    )
}
