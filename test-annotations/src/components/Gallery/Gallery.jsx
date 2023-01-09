import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Comment } from "../Comments/Comments";
import "./Gallery.scss";

export const Gallery = () => {
  const [comments, getComments] = useState([]);

  const [comment, createNewComment] = useState();
  const [imgWidth, getImgWidth] = useState(324);
  const [parentElementSize, getParentElementSize] = useState();
  const imgRef = useRef();
  let galleryWidth;

  //zoom func
  const handleZoom = () => {
    if (imgWidth === 324) {
      getImgWidth(596);
    } else {
      getImgWidth(324);
    }
  };

  useEffect(() => {
    galleryWidth = document
      .querySelector(".App-gallery")
      .getBoundingClientRect().width;
    getParentElementSize(galleryWidth);
    //updating parent element on window resize
    window.addEventListener("resize", () => {
      galleryWidth = document
        .querySelector(".App-gallery")
        .getBoundingClientRect().width;
      getParentElementSize(galleryWidth);
    });
    axios
      .get("http://localhost:3000/annotations")
      .then((data) => getComments(data.data));
  }, []);

  //creating new object with coordinates for new comment
  const handleComment = (e) => {
    e.stopPropagation();
    const parentElementWidth = parentElementSize;
    const parentElementX = document
      .querySelector(".App-gallery")
      .getBoundingClientRect().left;

    const offsetX =
      e.clientX - (parentElementWidth - imgWidth) / 2 - parentElementX;
    const offsetY = e.clientY;
    const newComment = {
      pos: {
        x: offsetX / imgWidth,
        y: offsetY,
      },
    };

    createNewComment(newComment);
  };

  useEffect(() => {
    createNewComment();
  }, [comments]);

  return (
    <div className="wrapper">
      <section className="App-gallery" onClick={handleZoom}>
        <img
          ref={imgRef}
          srcSet="https://i.imgur.com/qXPUGJy.png"
          className="App-img"
          alt="img"
          width={imgWidth}
          onClick={handleComment}
        />
        {comments.length > 0 &&
          comments.map((commentFromArray) => {
            return (
              <Comment
                key={commentFromArray.pos.x}
                {...commentFromArray}
                createNewComment={createNewComment}
                parentElementWidth={parentElementSize}
                width={imgWidth}
                getComments={getComments}
              />
            );
          })}
        {comment && (
          <Comment
            {...comment}
            getComments={getComments}
            parentElementWidth={parentElementSize}
            width={imgWidth}
          />
        )}
      </section>
    </div>
  );
};
