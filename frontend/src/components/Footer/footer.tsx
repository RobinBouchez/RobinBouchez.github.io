import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <MDBFooter className='text-center text-lg-start text-muted'>
            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                SwitchARoom
                            </h6>
                            <p>
                                SwitchARoom is a new and simple platform that allows you to find the perfect room for you.
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>About us</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Help
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Our story
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Privacy
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Terms of use
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Follow us</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Facebook
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    X/Twitter
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Instagram
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Skype
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-2' />
                                VUB, Brussel 1050, Belgium
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                info@switcharoom.com
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> +32 470 535 598
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright
            </div>
        </MDBFooter>
    );
} export default Footer;
