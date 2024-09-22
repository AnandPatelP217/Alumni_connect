import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#1a1a1a',
    color: '#f2f2f2',
    padding: '3rem 0',
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    borderTop: '3px solid #3498db',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const sectionStyle = {
    marginBottom: '2rem',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const linkStyle = {
    color: '#f2f2f2',
    textDecoration: 'none',
    margin: '0 0.5rem',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#3498db',
    },
  };

  const socialIconsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    fontSize: '2rem',
  };

  const iconStyle = {
    color: '#f2f2f2',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#3498db',
    },
  };

  const copyrightStyle = {
    marginTop: '2rem',
    fontSize: '0.9rem',
    borderTop: '1px solid #f2f2f2',
    paddingTop: '1rem',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Quick Links</h3>
          <nav>
            <a href="/about" style={linkStyle}>About</a> |{' '}
            <a href="/contact" style={linkStyle}>Contact</a> |{' '}
            <a href="/privacy" style={linkStyle}>Privacy Policy</a> |{' '}
            <a href="/terms" style={linkStyle}>Terms of Service</a>
          </nav>
        </div>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Connect With Us</h3>
          <div style={socialIconsStyle}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div style={copyrightStyle}>
          &copy; {new Date().getFullYear()} College Social Network. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
