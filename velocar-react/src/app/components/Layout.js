"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../public/assets/styles/carView.css";

const Layout = ({ children }) => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);

  useEffect(() => {
    if (!currentUserLoaded) {
      loadCurrentUser();
    }
  }, [currentUserLoaded]);

  const loadCurrentUser = () => {
    fetch(`http://localhost:3001/currentUser`)
      .then((response) => response.json())
      .then((data) => {
        let y = data[0];
        if (y.name == "notSignedIn") {
          setSignedIn(false);
        } else {
          setSignedIn(true);
        }
        setCurrentUserLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="wrapper">
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
                <Link href="/pages/Login" legacyBehavior>
                  <a>
                    {isSignedIn && <>Sign Out</>}
                    {!isSignedIn && <>Sign In</>}
                  </a>
                </Link>
              </u>
            </p>
          </div>

          <div className="SignUpButton" id="buttons">
            <p className="UpperBarElements">
              <u>
                <Link href="/pages/signup" legacyBehavior>
                  <a>Sign Up</a>
                </Link>
              </u>
            </p>
          </div>

          <div className="FAQButton" id="buttons">
            <p className="UpperBarElements">
              <u>
                <Link href="/pages/FAQ" legacyBehavior>
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
      </div>
    </>
  );
};

export default Layout;
