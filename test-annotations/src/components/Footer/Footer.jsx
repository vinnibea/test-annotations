import React from "react";
import "./Footer.scss";
export const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="App-guide">
        <p>
          To leave a comment, mouseover
          <span className="App-icon App-icon--plus"></span>
        </p>
        <p>
          {" "}
          on an image and click the left mouse button
          <span className="App-icon App-icon--mouse"> </span>
        </p>
      </div>
    </footer>
  );
};
