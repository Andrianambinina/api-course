import React from 'react';

const Field = ({ name, label,type, value, onChange, placeholder = "", error = ""}) => (
    <div className="mb-3">
        <label htmlFor={name}>{label}</label>
        <input type={type}
               id={name}
               className={"form-control" + (error && " is-invalid")}
               name={name}
               placeholder={placeholder || label }
               value={value}
               onChange={onChange}
        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
)

export default Field;