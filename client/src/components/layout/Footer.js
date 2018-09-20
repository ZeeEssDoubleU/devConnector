import React from "react";

const Footer = (props) => {
   return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
         Copyright &copy; {new Date().getFullYear()} DevConnector
      </footer>
   );
};

export default Footer;
