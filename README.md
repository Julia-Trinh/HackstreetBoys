# Video Demo
https://www.youtube.com/watch?v=E6_YSjImO50&ab_channel=HoangVuLuu

# Steps to Follow for Installation

## 1. Install dependencies
```
npm install react-router-dom
```
```
npm install axios
```
```
npm install express
```
```
npm install mongoose
```
```
npm install dotenv
```
```
npm install cors
```
```
npm install openai dotenv
```
> make sure to change the directory to "frontend" first, by typing the command ```cd frontend```
```
npm install
```

## 2. Run the frontend server
> Starting from the root directory of the project
```
cd frontend
```
```
npm run dev
```

## 3. Run the backend server
> Starting from the root directory of the project
```
cd backend
```
```
npm start
```

## 4. config.env file
Make sure you have a config.env file in the ```backend``` folder. If not, create one with the following:
```
import dotenv from "dotenv";
dotenv.config();

ATLAS_URI=mongodb+srv://juliatrinh:123@cluster0.t5bxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

OPENAI_API_KEY= ***
```
> *** Replace with your own OpenAI API key; Gitignore will ignore this file for security issues
