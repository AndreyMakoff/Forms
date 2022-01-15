import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ searcValue, onChange }) => {
    return (
        <input
            className="rounded-pill m-1 p-1"
            type="text"
            name=""
            id=""
            value={searcValue}
            onChange={onChange}
            placeholder="found me..."
        />
    );
};
SearchInput.propTypes = {
    searcValue: PropTypes.func,
    onChange: PropTypes.func.isRequired
};
export default SearchInput;
