# Instructions:

-   Maintain the file structure given below

```
.
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── controllers
│   │   ├── displayProducts.js
│   │   └── Whatever else you import to routes
│   │
│   ├── index.js  (Main file to run)
│   ├── middleware
│   │   ├── logger.js
│   │   └── Whatever else you have to run on request
│   ├── models
│   │   └── product.model.js
│   └── routes
│       ├── notFound.js
│       ├── product.js
│       └── Whatever other routes you have
│
└── All other environment files and config files

```

For each new route, make a controller as a new file, and import it into whatever route file you have made.
