# bugtrvcker - cs50x Final Project
---
#### Video Demo:  www.youtube.com/myvid24254

#### Description:

##### What is bugtrvcker
bugtrvcker is a web app for tracking bugs. The user can sign up with an email and password, sign in into their account, create projects and add bugs to projects for convenient tracking. The user can create, read, update and delete projects and tracked bugs.

##### What was it made with - summary
bugtrvcker's frontend is written using the Vue.js framework with Quasar as a component library. The backend is written in Python, using FastAPI as a more modern alternative to Flask for serving API endpoints to the frontend, as well as sqlite3 with SQLAlchemy for the database.

##### Frontend
I chose Vue 3 due to some previous experience with Vue as a very useful tool for modern web development. Instead of re-inventing a lot of wheels, I chose Quasar as my framework on top of Vue for easy access to organized components and styling. Quasar in this project is used similarly to how one would use Bootstrap. Some noteworthy Vue libraries used are VueRouter for routing between pages/components, Pinia for state management, axios for HTTP requests.

Important files:
- Login.vue - Vue component containing the login page
- Register.vue - Vue component containing the signup page
- Hone.vue - Vue component containing the home page with a list of user created projects
- Project.vue - Vue component containing the list of bugs for a specified project
- App.vue - Wrapper component for other components, content dynamically changes based on current route
- index.html - Unlike traditional web development, index.html only exists as an almost blank file where the Vue framework will dynamically inject all relevant code from above components automatically.
main.js - the Vue app instance itself is created here, as well as imports for some libraries and route details for VueRouter

There are a number of additional config files such as vite.config.js, quasar-variables.sass etc. that get auto-generated and need minimal interaction from the developer unless something relevant needs to be configured differently from default values.

##### Backend

I chose FastAPI as my backend web framework. It's similar enough to flask, but is faster, more convenient and more organized for building API-s due to good support for Python type hints.
