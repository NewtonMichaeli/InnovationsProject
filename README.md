# InnovationProject

```InnovationProject```, a project-sharing platform, allowing it's users to create inventions and join others to contribute to other inventions.

## Features:
* Uploading/downloading assets to and from projects.
* Users can invite other users to their own inventions, allowing them to access and modify private information such as the project name, description, assets, etc.
* Social media system - users can search, follow and message other users.

## Setup

### 1. Install dependencies

```cmd
cd client && npm i
cd ../server && npm i
```

### 2. Launch the application

* This project uses MongoDB as a primary database. Either install it on your computer, or use it's cloud version. You can modify the ```DB_CONNECTION``` connection string accordingly inside ```server/.env```.


Start the server first:
```cmd
cd server && npm run dev
```

Then run the client (in another command line):
```cmd
cd client && npm run dev
```
Open [localhost:3000](http://localhost:3000) to see the application.
