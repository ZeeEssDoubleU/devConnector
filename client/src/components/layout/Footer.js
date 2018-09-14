import React, { PropTypes } from 'react';

const Footer = (props) => {
   return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
         Copyright &copy; {new Date().getFullYear()} DevConnector
      </footer>
   );
}

Footer.propTypes = {

};

export default Footer;
