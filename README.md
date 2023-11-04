# Moment


## Project Summary
This project aims to create a social media platform that allows people to establish connections with others and showcase their most cherished life experiences and moments within the community.

## Wiki Link
https://github.com/heehyun1128/yc-Moment/wiki/Project-Highlight
## Link to Live Site

https://moment-2igd.onrender.com/


## Contact the Project Owner
linkedin.com/in/yi-c-452811132
## Technologies Used

Frameworks, Platforms, and Libraries
> React

> Redux/Redux-thunk

> HTML 5

> CSS

> Javascript

> JSX

> Flask

> SQLAlchemy

Database
> Development: SQLite3

> Production: PostgreSQL

Hosting:
> Render.com


- Upcoming Features
   >Google Map

   >Recommendations

   >Hash Tags
      


## Getting Started


* Start the project locally

  - Clone github repo to you local directory
    - git clone https://github.com/heehyun1128/API-project.git

*  Install dependencies

      >pipenv install -r requirements.txt

*  Create a .env file based on the example with proper settings for your development environment

*  Make sure the SQLite3 database connection URL is in the .env file
*  Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ````bash
   cd app
   pipenv shell
   flask db upgrade
   flask seed all
   flask run


*  Start the project frontend
    - cd to frontend directory and run npm start
      ````bash
      cd react-app
      npm start
    - the project will be running locally at http://localhost:3000/
      

## Features


  >Landing Page

      >Sign Up/ Log In/ Log Out

      >Posts

            1.See All Posts and post details
            2.See A User's Posts
            3.Create A New Post with Image Upload via AWS S3 Bucket 
            4.Update A Post with Image Update via AWS S3 Bucket 
            5.Delete A Post

      >Comments
            
            1.See All Post Comments
            2.Create A New Comment on A Post with Image Upload via AWS S3 Bucket
            3.Update A Comment on A Post with Image Update via AWS S3 Bucket 
            4.Delete A Comment

      >Search

            Search For A Post By Username, Post Content, and Comment

      >Liking
            
            1.Like A Post
            2.Remove Like On A Post
            3.View All Posts Liked By User
            4.View Total Likes Of A Post

      >Following
            
            1.Follow A User
            2.Remove Followed Users
            3.Remove Followers
            4.View Followed Users
            5.View Followers

## Upcoming Features



* Google Map
* Recommendations
* Hash Tags



