import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMobileMenuOpen(false);
    };

    // Add scroll effect to navbar
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(5, 5, 30, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '#05051E';
                navbar.style.backdropFilter = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo"><img src="/public/favicon.ico" alt="" /></div>
                    <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li className="navbar-item">
                            <a 
                                href="#about" 
                                className="navbar-link"
                                onClick={(e) => handleNavClick(e, '#about')}
                            >
                                About
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a 
                                href="#facilities" 
                                className="navbar-link"
                                onClick={(e) => handleNavClick(e, '#facilities')}
                            >
                                Facilities
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a 
                                href="#events" 
                                className="navbar-link"
                                onClick={(e) => handleNavClick(e, '#events')}
                            >
                                Events
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a 
                                href="#testimonials" 
                                className="navbar-link"
                                onClick={(e) => handleNavClick(e, '#testimonials')}
                            >
                                Testimonials
                            </a>
                        </li>
                    </ul>
                    <div className="button-group">
                        <button className="signup-button" onClick={handleSignUp} style={{backgroundColor:'#640EF1'}}>
                            Sign Up
                        </button>
                        <button className="login-button" onClick={handleLogin} style={{backgroundColor:'#640EF1'}}>
                            Login
                        </button>
                    </div>
                    <button 
                        className="mobile-menu-toggle" 
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        ☰
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pengantar">
                <h1>What's RPIC?</h1>
                <p>Platform reservasi untuk internet cafe, MOD gaming center di Bandung.</p>
            </div>

            {/* Intro */}
            <div className="intro" id="about">
              <div className="intro-text">
                <h1>Reserve Your PC</h1>
                <h2>Temukan PC yang pas untukmu...</h2>
              </div>
              <div className="intro-image">
                <iframe
                  width="100%"
                  height="300"
                  src="https://www.youtube.com/embed/3iSdmvBEKKA"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <section className="content" id="facilities">
                <h1>Explore Our Facilities</h1>
                <div className="grid-container">
                    <img 
                        src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=250&fit=crop" 
                        alt="Alpha Gaming Zone"
                        loading="lazy"
                    />
                    <img 
                        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop" 
                        alt="Beta Gaming Zone"
                        loading="lazy"
                    />
                    <img 
                        src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop" 
                        alt="Drive Simulator"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Promotions */}
            <section className="promotions">
                <h1>Special Offers</h1>
                <div className="promotion-cards">
                    <div className="promotion-card">
                        <h2>First-Time User</h2>
                        <p>Get 20% off on your first reservation!</p>
                    </div>
                    <div className="promotion-card">
                        <h2>Weekly Member</h2>
                        <p>Book for a week and save 10%!</p>
                    </div>
                </div>
            </section>

            {/* Events */}
            <section className="events" id="events">
                <h1>Upcoming Events</h1>
                <div className="event-cards">
                    <div className="event-card">
                        <img 
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop" 
                            alt="MOD Esports Tournament" 
                            className="event-image"
                            loading="lazy"
                        />
                        <h2>MOD Esports Tournament</h2>
                        <p>Join our Dota 2 tournament and win exciting prizes!</p>
                        <p><strong>Date:</strong> November 5, 2024</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://images.unsplash.com/photo-1556438064-2d7646166914?w=300&h=200&fit=crop" 
                            alt="Christmas Gaming Night" 
                            className="event-image"
                            loading="lazy"
                        />
                        <h2>Christmas Gaming Night</h2>
                        <p>Gather with fellow gamers and enjoy a night of fun!</p>
                        <p><strong>Date:</strong> December 25, 2024</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials infinite-scroll" id="testimonials">
                <h1>What Our Customers Say</h1>
                <div className="tag-list">
                    <div className="loop-slider" style={{"--duration": "15951ms", "--direction": "normal"}}>
                        <div className="inner">
                            <div className="tag"><span>#</span> wow</div>
                            <div className="tag"><span>#</span> Keren</div>
                            <div className="tag"><span>#</span> atyan nih ownernya</div>
                            <div className="tag"><span>#</span> modern idea</div>
                            <div className="tag"><span>#</span> Next level</div>
                            <div className="tag"><span>#</span> booking mudah!</div>
                            <div className="tag"><span>#</span> wkwk jadi ga telat</div>
                        </div>
                    </div>
                    <div className="loop-slider" style={{"--duration": "19260ms", "--direction": "reverse"}}>
                        <div className="inner">
                            <div className="tag"><span>#</span> Next level</div>
                            <div className="tag"><span>#</span> jadi mudah!</div>
                            <div className="tag"><span>#</span> gampang!</div>
                            <div className="tag"><span>#</span> modern idea</div>
                            <div className="tag"><span>#</span> bjir keren</div>
                            <div className="tag"><span>#</span> 1 jam berapa</div>
                            <div className="tag"><span>#</span> ga usah ke warnet cuy</div>
                            <div className="tag"><span>#</span> nice platform</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="location">
                <h1>We Are Here</h1>
                <div className="map-container">
                    <iframe
                        title="MOD Gaming Center Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.848388062227!2d107.6088424!3d-6.9087255999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e79ec791a411%3A0x473aa012882dfe65!2sMod%20Arcade%20Arena!5e0!3m2!1sen!2sid!4v1735130664918!5m2!1sen!2sid"
                        referrerPolicy="no-referrer-when-downgrade"
                        width="100%"
                        height="450"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            
            {/* Footer */}
            <footer className="footer-container">
                <div className="footer-content">
                    <div className="information">
                        <p>MOD gaming center Bandung</p>
                        <p>jalan purnawarman sumur no 24 - 26 40117 Bandung West Java</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;