import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import TitleImage from './TitleImage'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";

const Home = ()=>{

    const customTitle = {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "70px",
        lineHeight: "82px",
        color: "black"
    }
    
    const titleButton = {
        marginTop : "30px"
    }
    const textCenter = {
        paddingLeft : "8%"
    }
    const inline = {
        display : "inline"
    }

    return(
        
        <div className="WrapperMain">
        {/* <div className="card" style={{margin:"10%",padding:"20px",textAlign:"center"}}>
            <div className="row">
                <a href ="/auth/google" className="waves-effect waves-light btn">SignUp With Google</a>
            </div>
        </div> */}
                    <Row>
                        <Col id="customColMe">
                            <div>
                                <h1 style={customTitle}>Protect your content,</h1>
                                <h1 style={customTitle}>track your images.</h1>
                                <div >
                                    
                                    <button className="critleButton" style={titleButton}>Try App</button>
                                
                                    <Nav.Link href="#About" id="navMarginMe" style={inline}>Learn more &gt; </Nav.Link>
                                </div>
                            </div>
                        </Col>
                        <Col >
                            <TitleImage />
                        </Col>
                    </Row>


                    <div id="About">
                    <Row className="customSubRow align-items-center">
                        <Col xs={7}>
                            <img className="customSubImage" src={require('./TitleAssets/Image1.png')} />
                        </Col>
                        <Col>
                            <h3 className="subInfoHeading">Protect your intellectual property.</h3>
                            <p className="subInfoBody">By identifying instances of image piracy,</p>
                            <p className="subInfoBody">you can take action to prevent unauthorized use of your content.</p>
                        </Col>
                    </Row>

                    <Row className="customSubRow align-items-center">
                        <Col style={textCenter}>
                            <h3 className="subInfoHeading">Save time and efforts</h3>
                            <p className="subInfoBody"> Instead of manually searching the web for instances of image </p>
                            <p className="subInfoBody">piracy, the app can do the work for you in a matter of minutes.</p>
                        </Col>
                        <Col>
                            <img className="customSubImage" src={require('./TitleAssets/Image2.png')} />
                        </Col>
                    </Row>

                    <Row className="customSubRow align-items-center">
                        <Col>
                            <img className="customSubImage" src={require('./TitleAssets/Image3.png')} />
                        </Col>
                        <Col style={textCenter}>
                            <h3 className="subInfoHeading">Maintain brand reputation.</h3>
                            <p className="subInfoBody">Ensuring that your images are being used in the appropriate context and with proper credit can help you maintain a positive image</p>
                            <p className="subInfoBody">and avoid any negative consequences associated with unauthorized use of your content.</p>

                        </Col>
                    </Row>
                    </div>
            </div>

        
    )
}

export default Home