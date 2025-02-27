# Video Demo
https://www.youtube.com/watch?v=E6_YSjImO50&ab_channel=HoangVuLuu

# Inspiration
Following the massive success of the game "Dumb ways to die", we decided to combine the concept with our limited game dev experience and challenge ourselves.

# What it does
The project consists of multiple mini-games of adjustable difficulty that are time-limited. The goal is to allow the user to improve his typing skills in a fun and challenging way. The website also uses AI to generate scripts personalized to each person according to his level and struggles. For example, someone who messes up words with the letter 'R' will be given an exercise emphasizing that letter.

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
