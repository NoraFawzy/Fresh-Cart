import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className="bg-emerald-700 py-5">
      <div className="container mx-auto text-white text-center">
        <div className="mb-4">
          <a href="https://www.facebook.com" className="mx-2 text-white hover:text-gray-300">
            <i className="fab fa-facebook-f fa-2x"></i>
          </a>
          <a href="https://www.twitter.com" className="mx-2 text-white hover:text-gray-300">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://www.instagram.com" className="mx-2 text-white hover:text-gray-300">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com" className="mx-2 text-white hover:text-gray-300">
            <i className="fab fa-linkedin-in fa-2x"></i>
          </a>
        </div>
        <div className="mb-4">
          <a
            href="/src/assets/Nora_Fawzy_CV .pdf"
            download
            className="bg-white text-emerald-600 py-2 px-4 rounded hover:bg-gray-300"
          >
            Download CV
          </a>
        </div>
        <div className="font-bold">
          <i className="fa fa-copyright"></i> 2025 Nora Fawzy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}