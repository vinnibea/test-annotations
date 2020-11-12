# Annotations experience

This test task is about implementing a feature of leaving annotations on images, like on Figma or Invision, but much simpler.

The main purpose is to see your code structure, code quality, and approach in general.

## Getting Started

### Fake server

The server implementation is optional but definitely makes you stand out of the crowd. 

It basically creates the following endpoints:

```
GET v1/annotations
POST v1/annotations
DELETE v1/annotations/{id}
```

**Make it running:**

- Run `npm i -g json-server`
- Run `json-server --watch db.json`

### Mockup

[Get a mockup](https://www.figma.com/file/RkOUnhCQ4fydOnRzuXd6SW/Test-Task?node-id=0%3A1). If you don't have access, please write an email to dev@24slides.com.

### How annotations work?

An annotation is a comment you can leave on an image to request some change.

A position of the annotation represented in `x`, `y` numbers between 0 and 1, where 0 is top or left, 1 is right or bottom.

When user clicks on the image, the calculation of `x` and `y` is gonna be:

```
x = left offset / width
y = top offset / height
```

### Requirements

- You need to use the following stack: React, SASS. Please follow best practices as much as possible and focus on quality.
- Create a markup according to the mockup, the layout should be responsive
- If you resize/zoom the browser tab, annotations should stay on same places on images
- Implement the possibility drag the image vertically
    - If uploaded image's height is bigger than container's, it should be cropped
    - When image is cropped and user sees only part of it, you need to make is possible to "drag" it vertically with the mouse
    - Annotations should stay on same places when you drag the image vertically
- Implement the possibility to zoom in/out the image
    - The max size for width should be the width of the container
    - The max size for height should be the size of the image, regardless of the container height
    - Annotations should stay on same places when you zoom in/out the image
    - Optionally: it would be nice to be able to zoom the image using the mouse wheel
- Implement the possibility to create annotations on the image
    - Optionally: send a request to `POST v1/annotations` when submitting new annotation
    - Optionally: implement the possibility to delete an annotation via `DELETE v1/annotations/{id}`
    - Optionally: implement the possibility to move an annotation using mouse 
- Optionally: upload the image on drag&drop in the container
- Optionally: preload a default image on initialization and render annotations from `GET v1/annotations`

### Any questions?

If you have any questions or suggestions related to the task, please submit an issue.