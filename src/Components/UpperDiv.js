import React from 'react';
import './UpperDiv.css';

const UpperDiv = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row unused"></div>
            </div>
            <div className="container-fluid upper-custom">
                <div className="row align-items-center row-center-upper">
                    <div className="col-md-12 text-center">
                        <h1 className="custom-font">Create your own Recipe Book</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpperDiv;