# project-group-turquoise-tuataras

<table align="center">
<tr><td align="center" width="9999">  
<img src="https://user-images.githubusercontent.com/53165831/226262458-54f18685-671f-4e17-bc16-372b11524e07.png" align="center" width="1500" alt="Project icon">
</td></tr>
</table>
<h2>Members</h2>
<p>Benjamin Goh, Cameron Nathan, Yasith Udagedara, Yunqi Zheng, Hok Lai Frankie Yu, Paul Lan</p>

<h1>Introduction</h1>

Plan My Plate is Turqoise Tuataras' CS732/SE750 Web Composition Project. It is a meal schedule preparation website which allows users to browse recipes based on their dietary requirements. Users can save recipes, add them to a meal schedule, generate a shopping list, and find nearby supermarkets using the inbuilt Google Maps feature.

# How to Run our Website
### 1. Install
For both the frontend and backend folders
```
npm install
```
### 2. Launch Backend Server  
In the backend folder
```
npm start
```
### 3. Launch Frontend
In the frontend folder
```
npm run dev
```
#### Google Maps Note
Google Maps API does not work in China. To remedy this issue, try to use a VPN before launching our application.

## Backend Environment Variables
Create a .env file in the backend folder and put the following text in:
 
MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/planmyplate  
SECRET=aApz8UBmvP5cPWpL2H55EVekqAotK7EgUy4e2rk0  
GOOGLE_API_KEY={insert Google API key here}  
SPOONACULAR_URL=https://api.spoonacular.com/recipes  
SPOONACULAR_API_KEY={insert Spoonacular API key here}

## Frontend Environment Variables
Create a .env file in the frontend folder and put the following text in:

VITE_GOOGLE_API_KEY={insert Google API key here}  
VITE_API_BASE_URL=http://localhost:3000/api

# Additonal Information
For more information, check out our wiki on this repository.

# Contact Us
bgoh684@aucklanduni.ac.nz  
cnat307@aucklanduni.ac.nz  
yuda947@aucklanduni.ac.nz  
yzhe583@aucklanduni.ac.nz  
yhok562@aucklanduni.ac.nz  
slan526@aucklanduni.ac.nz