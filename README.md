# Cohort

Cohort is an app that gives background information on all of the Software Engineer Apprentices in the 2023 Cohort.

The the back-end of the application is built using Golang and the Gin package. ElephantSQL was used to host a PostgreSQL database.

The front-end was built with TypeScript and React. 

The app uses react-bootstrap and bootstrap icons for styling.


## Installation

In order to run the application, open a split terminal.

In the first terminal:

```bash
cd server
go run main.go
```

In the second terminal:

```bash
cd client
npm install
npm i --save react-bootstrap
npm i bootstrap-icons
npm run dev
```

## Deployment

The application is deployed on Render's free tier. 

The back-end is deployed at https://cohort-app.onrender.com

The front-end is deployed at https://cohort.onrender.com

Please note that since the application's back-end is deployed on Render's free tier, it will spin down after periods of inactivity. When visiting or making API calls to the back-end, it may take a few minutes for Render to spin up the web-service.