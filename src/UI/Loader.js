import React from "react";

const Loader = props => {
    return (
        <div className="post-form-loader" style={{ display: props.loading ? "grid" : "none" }}>
            <div><div className="lds-dual-ring"></div></div>
        </div>
    )
};

export default Loader;