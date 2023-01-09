import React, { useState, useEffect } from "react";
import "../Gallery/Gallery.scss";
import axios from "axios";

export const Comment = ({
  //*data*/
  pos,
  id,
  comment,
  author,
  parentElementWidth,
  width,
  //***methods***//
  createNewComment,
  getComments,
}) => {
  const [show, setShow] = useState(false);
  const [text, getText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      const id = Math.floor(Math.random() * 100);
      axios.post(
        "http://localhost:3000/annotations",
        {
          pos: {
            x: pos.x,
            y: pos.y,
          },
          comment: text,
          id,
          author: "Josh Dun",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      // refresing data from server
      axios.get("http://localhost:3000/annotations").then((data) => {
        getComments(data.data);
        getText("");
      });
    } else {
      return;
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/annotations/${id}`);
    axios.get("http://localhost:3000/annotations").then((data) => {
      getComments(data.data);
      getText("");
    });
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const el = document.getElementById(`${id}`);
      if (e.target == el) {
        setShow(false);
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  let x;
  let y;

  if (pos) {
    x = pos.x * width + (parentElementWidth - width) / 2 + 200 + "px";
    y = pos.y + "px";
  }

  //styles for inputs, form, bubble, etc and some calculation for resizing picture and window
  const bubbleStyles = {
    left: x,
    top: y,
  };

  const commentClosed = {
    ...bubbleStyles,
    top: pos.y + 68 + "px",
  };

  const commentOpened = {
    ...commentClosed,
    zIndex: "99",
  };
  /**splitting name for avatar***/
  let avatarName;
  if (author) {
    avatarName = author
      .split(" ")
      .map((name) => name[0])
      .join("");
  }

  return (
    <>
      {id ? (
        <span
          className="bubble"
          id={id}
          style={bubbleStyles}
          onClick={(e) => {
            e.stopPropagation();
            setShow(true);
            createNewComment();
          }}
        >
          {id}
        </span>
      ) : (
        ""
      )}
      {id && show && (
        <>
          <span
            style={bubbleStyles}
            className="bubble"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
          >
            {id}
          </span>
          <div style={commentOpened} className="App-comment bubble--opened">
            <span className="App-comment-arrow"></span>
            <div
              className="App-comment-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="App-avatar">{avatarName}</div>
              <div className="App-comment-text">
                <h3 className="App-comment-author">{author}</h3>
                <p>{comment}</p>
              </div>
            </div>
            <span
              className="App-bin"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
            ></span>
          </div>
        </>
      )}

      {!id && (
        <>
          <span className="bubble" style={bubbleStyles}></span>
          <form
            style={commentClosed}
            className="App-comment bubble--closed"
            onSubmit={handleSubmit}
          >
            <span className="App-comment-arrow"></span>
            <input
              type="text"
              placeholder="Leave a comment"
              value={text}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => getText(e.target.value)}
            ></input>
            <button
              className="App-comment-button"
              type="submit"
              onClick={(e) => e.stopPropagation()}
            />
          </form>
        </>
      )}
    </>
  );
};
