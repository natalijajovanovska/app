import React from 'react';
import './BottomDiv.css';
import Logo from './logo.png';

class BottomDiv extends React.Component {

    scrollTopFn = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row unused"></div>
                </div>
                <div className="container-fluid upper-custom">
                    <div className="row">
                        <div className="col-md-12">
                            <img onClick={this.scrollTopFn} className="img-fluid mx-auto d-block img-bottom mt-5" title="Scroll to Top" src={Logo} alt="RECIPE-ICON" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 className="custom-font">Recipe Box <br />A place where you can save all of your recipes</h2>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default BottomDiv;