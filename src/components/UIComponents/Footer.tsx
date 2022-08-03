import React from 'react';
import './Footer.css';

const Footer:React.FC = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h6>About</h6>
          <p className="text-justify">
            Scanfcode.com
            <i>CODE WANTS TO BE SIMPLE </i>
          </p>
        </div>

        <div className="col-xs-6 col-md-3">
          <h6>Categories</h6>
          <ul className="footer-links">
            <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
            <li>
              <a href="http://scanfcode.com/category/front-end-development/">
                UI Design
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/back-end-development/">
                PHP
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/java-programming-language">
                Java
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/android/">Android</a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/templates/">Templates</a>
            </li>
          </ul>
        </div>

        <div className="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul className="footer-links">
            <li><a href="http://scanfcode.com/about/">About Us</a></li>
            <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
            <li>
              <a href="http://scanfcode.com/contribute-at-scanfcode/">
                Contribute
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
            </li>
            <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-sm-6 col-xs-12">
          <p className="copyright-text">
            Copyright &copy; 2017 All Rights Reserved by
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
