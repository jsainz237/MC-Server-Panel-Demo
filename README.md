# Company Code Test (Copy)
## Jesse Sainz

I've decided utilize a **React + Typescript** front-end with a **Node.js + Express + Typescript** backend, along with a **PostgreSQL Database** to store the relevant data.

:warning:**NOTE:** The reason there are very little commits is because I have to limit the visibility of company's private resources given for their technical interview. I removed the company's resources from this copy, so everything in this repository is my own.

:warning:**NOTE:** I'm including docker files with environment variables so anyone can run the application. If this were going into production, the environment variables would not be pushed to the repository.

### STARTING THE APPLICATION
#### ...via docker compose
1. in root folder, run `docker-compose up --build`
2. Navigate to `localhost:5000/` to view application.
3. That's it!

#### ...via local machine
1. Make sure postgres is installed and running on your machine, and there is a database titled `shockbyte`.
2. In the project's folder, run `npm install` at the root folder.
3. Navigate to the `client/` folder and run `yarn install`.
4. navigate back to root folder `/` and run `npm start`. This 
will create a production build for both the server and the client.

> To run in a dev environment, in root folder, run `npm run dev` to start server, and in another terminal window, navigate to `client/` and run `npm start`

5. Navigate to `localhost:5000/` to view the application

### BACKEND
Acts as the backend / API for client facing UI. Done utilizing Typescript with Node.js, Express, and Cron-Jobs.

:warning:**NOTE:** For the backend, I'm leaving SQL execution logging on so you can see the SQL queries. If this were going into production, the logging would be turned off.

### FRONTEND (CLIENT)
Dashboard to show (theoretical) server analytics for minecraft host servers. Done utlizing Typescript with React and Redux.

<img width="1552" alt="allview" src="https://user-images.githubusercontent.com/25487419/84076994-55575300-a99c-11ea-83ea-88ca7637a252.png">

<img width="1552" alt="singleview" src="https://user-images.githubusercontent.com/25487419/84077007-57b9ad00-a99c-11ea-8ae7-73367117948e.png">

:warning:**NOTE:** I've tested the front end on Chrome, Safari, and Firefox. It seems Safari has a couple rendering issues that, if in production, I'd fix. However, for the purpose of the MVP I am going to leave it.

