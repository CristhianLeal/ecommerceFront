<h1 align="center">
Challenge IT Crowd
</h1>

<div align="center">

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white) 
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) 

</div>

## Requirements:

Your task will be building a frontend that can:

- **Display a list of products** obtained from the backend, and it should display all of them.
- When clicking on a product, you should **display a detailed view** of that product.
- The list of products should include
    - The product’s **image.**
    - Its **name.**
    - The **price** of the product.
- The detailed view should include the previous properties as well as the **description**.
- Extras
- Implement an ‘admin’ view where the user can manage products and perform all CRUD operations through the UI.


## Development

### Previous requirements

* Have installed a version 16.13 or higher of [Node Js](https://nodejs.org/en)

### Setup

The project repository should be cloned:
```
git clone https://github.com/CristhianLeal/ecommerceFront.git
```

### Install the dependencies: 

```
npm install 
```
### Clarifications

* For the correct functioning of the project, the Frontend and the Backend are necessary.

### Available Scripts

| Script         | Descripción                                         |
| -------------- | --------------------------------------------------- |
| npm run dev    | Start a local web server.                           |
| npm run build  | Generate the fine application.                      |
| npm run lint   | Checks for style errors.                            |
| npm run preview| Generate a page preview                             |    


## Dependencies
 - [react](https://es.react.dev/) Execution environment necessary to run the application.
 - [react-dom](https://es.legacy.reactjs.org/) Library that is responsible for rendering React components in the browser.
 - [react-hook-form](https://react-hook-form.com/) Library for managing form state and validation in React applications.
 - [react-toastify](https://www.npmjs.com/package/react-toastify) React-Toastify is a library for displaying elegant and customizable pop-up notifications (toasts) in React web applications.
 - [axios](https://axios-http.com/) Promise-based HTTP client for making asynchronous requests in browser and Node.js environments

## Estructura de carpetas

```
CRIPTOTEST-FRONT
├── node_modules
├── public
└── src
    ├── assets
    ├── Components
    ├── hooks
    ├── Pages
    ├── App.css
    ├── App.jsx
    ├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
├── vite.config.js
```


## Deploy

The aplication is deployed on [Vercel](https://vercel.com/) on the following link:
```
https://ecommerce-front-cyan.vercel.app/
```