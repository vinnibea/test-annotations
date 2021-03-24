# Annotations experience

This test task is about implementing a feature of leaving annotations on images, like on Figma or Invision, but much simpler.

The main purpose is to see your code structure, code quality, and approach in general.

## Getting Started

### Fake server

The server implementation is required. 

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

A position of the annotation represented in `x`, `y` numbers between `0` and `1`, where `0` is top or left, `1` is right or bottom.

When user clicks on the image, the calculation of `x` and `y` is gonna be:

```js
x = left offset / width
y = top offset / height
```

### Requirements

- The required stack: React, SCSS. Other tools are up to you
- Create a markup according to the mockup, the layout should be responsive
- Implement the possibility to create annotations on the image
    - Send a request to `POST v1/annotations` when submitting new annotation
    - Implement the possibility to delete an annotation via `DELETE v1/annotations/{id}`
- If you resize/zoom the browser tab, annotations should stay on same places on the image
- Preload a default image on initialization and render annotations from `GET v1/annotations`
- No unnecessary things in the final code like commented code, debug logs, etc
- Follow best practices as much as possible and focus on quality

### Any questions?

If you have any questions or suggestions related to the task, please submit an issue.
