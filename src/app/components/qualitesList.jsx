import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitesList;
