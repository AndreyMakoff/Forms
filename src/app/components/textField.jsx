import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, name, type, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toogleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const getInputClass = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    id={name}
                    type={showPassword ? "text" : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={getInputClass()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toogleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextField;
