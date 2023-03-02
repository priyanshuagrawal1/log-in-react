import React from 'react'
import './checkbox.css'
export const Checkbox = ({ label, onChange }) => {

    return (
        <label className="checkbox">
            <input type="checkbox" onChange={(e) => { onChange(e.target.checked) }} style={{ width: "11px", height: "11 px" }} />
            <span > {label} </span>
        </label>
    )
}
