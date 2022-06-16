# bugtrvcker - CS50x Final Project
---
#### Video Demo:  https://youtu.be/KENCaCt0UmU

#### Description:

##### What is bugtrvcker
bugtrvcker is a web app for tracking bugs and other issues that need tracking in a project. The user can sign up with an username and password, sign in into their account, create projects and add bugs to projects for convenient tracking. The user can create, read, update and delete projects and tracked bugs. The goals of the project were to practice creating an API for interacting with a database (CRUD functionality) and to design a decent looking modern frontend for communicating with the API, with emphasis on getting more comfortable with CSS and animations.

##### What was it made with - summary
bugtrvcker's frontend is written using the Vue.js framework with Quasar as a component library. The backend is written in Python, using FastAPI as an alternative to Flask for serving API endpoints to the frontend and finally sqlite3 with SQLAlchemy for the database.

##### Frontend
I chose Vue 3 due to some previous experience with Vue as a very useful tool for modern web development. I chose Quasar as my framework on top of Vue for easy access to organized components and styling classes, as essentially an alternative to something like bootstrap, however also used CSS heavily for custom styling.

Some noteworthy Vue libraries used are VueRouter for routing between pages/components, Pinia for state management, axios for HTTP requests.

Important files:
- Login.vue - Vue component containing the login page with input fields for username and password, as well as a button for sending the login request to the backend
- Register.vue - Vue component containing the signup page with input fields for username, password, repeat password and a button for sending the user registration request to the backend
- Home.vue - Vue component containing the home page with a list of user created projects. This is the landing page after a user logs in. It has a form for creating a new project and a list of projects with edit and delete buttons attached to them. Once the user clicks a project listing, the user is taken to the Bugs.vue component where the tracked bugs for that project can be found.
- Bugs.vue - Vue component containing the list of bugs for a specified project. Contains a form for creating new bugs and a list of bugs. The list of bugs has two parts, unchecked bugs and checked (fixed) bugs. When the user creates a new bug, it will appear in the unchecked part of the list and when an user checks the checkbox infront of it, it gets moved to the checked part of the list. The main challenge here were getting the animations to play well and getting the lists to persist state.
- App.vue - Wrapper component for other components, content dynamically changes based on current route and animations get applied to route changes here
- store/index.js - I used Pinia for state management and all of the functionality lives in this file. Any data or API call that is needed by the components is kept here and can be imported. This is useful as it's a central point of truth for all data and related functionality.


There are a number of additional config files such as vite.config.js, quasar-variables.sass etc. that get auto-generated and need minimal interaction from the developer unless something relevant needs to be specifically configured.

##### Backend

I chose FastAPI as my backend web framework. It's similar enough to flask, but is faster, more convenient and more organized for building API-s due to good support for Python type hints. I also didn't need Jinja for templating as I was using Vue for the frontend.

The main job of the backend in this project is to be the database as well as the API for communicating with the database. There are 3 sqlite3 tables: users, projects and bugs. They are all related to each other in the expected way, where a user has a list of projects and each of those projects has a list of bugs.

The main.py file serves as home for all of the API endpoints that the frontend uses to communicate to the backend. Each endpoint has a job such as create user, log in, create project, get projects, edit project, delete project etc. Each of those will take the relevant inputs and call the corresponding function in the crud.py file, that holds all functions for interacting with the database through SQLAlchemy. The database tables are created also using SQLAlchemy in the models.py file (the database itself gets initialized in the database.py file, which gets imported by other files that need a database session). Creating tables and adding columns or relationships works through just editing the classes for the corresponding table.

The data that is being passed around is kept neat and clean using the pydantic library, which is something FastAPI uses by default. Pydantic is used for data validation, it enforces type hints at runtime, so we have a way of ensuring that something is responsible for making sure the data passed from the frontend to the backend and from the endpoint to the database interaction in crud.py is in the shape and form we are expecting it to be. This is accomplished by defining schemas in the schemas.py file which essentially allows us to create our own types similar to how we learned to do in C earlier in the course. The shape and form of that data gets validated all along the data stream and it makes python more type safe.

The user authentication is handled by storing username and password hash pairs in the database and checking them against the user request from the login form. The password hashing and verification are done using the passlib library in auth.py. I am also using JWT authentication for sessions. When the user logs in, a token is generated with an expiration time and while the token is active, it permits the user to access the API endpoints without having to log in. Each route that needs to be protected with authentication uses the Depends module from FastAPI which checks that the user trying to access a route is authenticated.


The project was a lot of fun and a great learning experience. The course allowed me to have a much greater understanding of what I had previously played around with. Thank you CS50 team.

