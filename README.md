
# Demo News Web Application

This is a demo news web application built with Next.js and MongoDB. The application allows users to view and read news articles from various sources.



## Tech Stack

* Next.js
* MongoDB
* Node.js
* React
* CSS Modules



## Installation

Install my-project with npm
 
To get started with the application, you need to have Node.js and MongoDB installed on your machine. Here are the steps to run the application:

1. Clone the repository to your local machine.
2. Run npm install to install the required dependencies.
3. Create a .env.local file at the root of the project and add the following environment variables:


```bash
MONGODB_URI=<your MongoDB connection string>
MONGODB_DB=<your MongoDB database name>
```

4. Run npm run dev to start the development server.
5. Open your browser and go to http://localhost:3000 to view the application.

## Features
View and read news articles from various sources
Filter news articles by category
Search for news articles by keyword
Bookmark news articles to read later
Add new news articles (admin only)

## Folder Structure

```bash

├── src/
    ├── public/
        ├── assets/
    ├── components/
    ├── pages/
    │   ├── api/
    │   │   ├── auth/
    │   │   ├── post/
    │   │   └── user/
    │   ├── auth/
    │   │   ├── login/
    │   │   ├── register/
    │   │   
    │   ├── post/
    │   ├── profile/
    │   │    
    │   ├── user/ 
    │   │ 
    └── README.md

```


## Contributing
This is a demo application and contributions are not currently being accepted. However, feel free to fork the repository and create your own version of the application.

## License
This application is licensed under the MIT License.