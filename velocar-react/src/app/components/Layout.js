"use client";

import React from "react";
import Link from "next/link";
import "../public/assets/styles/carView.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="UpperBlueBar">
        <div className="UpperLogo">
          <h1 className="VeloCarLogo">
            <Link href="/" legacyBehavior>
              <a id="deleteStorageLink">VeloCar</a>
            </Link>
          </h1>
        </div>

        <div className="SignInButton" id="buttons">
          <p className="UpperBarElements">
            <u>
              <Link href="../pages/Login" legacyBehavior>
                <a>Sign In</a>
              </Link>
            </u>
          </p>
        </div>

        <div className="SignUpButton" id="buttons">
          <p className="UpperBarElements">
            <u>
              <Link href="/signup" legacyBehavior>
                <a>Sign Up</a>
              </Link>
            </u>
          </p>
        </div>

        <div className="FAQButton" id="buttons">
          <p className="UpperBarElements">
            <u>
              <Link href="/faq" legacyBehavior>
                <a>FAQ</a>
              </Link>
            </u>
          </p>
        </div>
      </div>
      <main>{children}</main>
      <footer className="footer">
        <p>&copy; 2023 VeloCar. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
