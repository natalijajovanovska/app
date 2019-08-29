import React from 'react';
import './Footer.css';

class Footer extends React.Component {

    render() {
        return (
            <div className="container-fluid footer-custom">
                <div className="row">
                    <div className="text-center col-md-12 align-items-center d-flex justify-content-center">
                        <p className="text-white small mt-2 font-italic">NJ - Recipe Box 2019.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
