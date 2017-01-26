# nodejstest
This little app allows you to query the Yandex translation API in english,
french and spanish.

# Install
##0. Requirements
git and npm must be installed.

##1. Install and launch the database.
Install docker and mongo db on your computer.
Then, in a command prompt, run: `docker run -p 27017:27017 mongo`
This launches a container with mongoDB, exposing the port 27017.
So now the database is running, keep in mind that everytime it is shut down you
will lose all the data inside.

##2. Clone this repository.
Create a folder where you would like to install this project, then clone it there.
You can follow instructions on this from the [official github clone help](https://help.github.com/articles/cloning-a-repository/).

##3. Generate missing files and run the project.
Open a command prompt and go to project's folder.
Run the following commands.
`npm install`
This is downloading and installing all the project dependencies, it may take a while.
On windows:
`SET NODE_ENV=production`
On linux:
`export NODE_ENV=production`
This sets the configuration of the project to production. dev and test environment configurations are also available.
`npm start`
Your nodejs is now running, congratulations!
You will find the website at the following url: http://127.0.0.1:3000/

##4. Running unit tests.
If you want to run unit tests, you can use the following command:`npm test`
