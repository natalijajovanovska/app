import React from 'react';
import './Navbar.css';
import Logo from './logo.png';

class Navbar extends React.Component {

    render() {
        return (
            <div className="container-fluid" id="navbar">
                <div className="row">
                    <div className="navbar fixed-top navbar-custom">
                        <div className="col-md-12">
                            <img className="navbar-brand img-fluid logo-custom d-block mx-auto" src={Logo} alt="RECIPE-ICON" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
