![Team logo](https://user-images.githubusercontent.com/53165831/226262458-54f18685-671f-4e17-bc16-372b11524e07.png)


# Introduction

Plan My Plate is Turqoise Tuataras' CS732/SE750 Web Composition Project. 
It is a meal schedule preparation website that allows users to search for recipes and plan their meals for the week. 
Users can save recipes, add them to a meal schedule, generate a shopping list, and find nearby supermarkets.
The application makes use of the Spoonacular API for obtaining recipe data, and Google Maps API for location information.

# Set up the application for the first time

### 1. Backend Environment Variables
Create a .env file in the backend folder. It should contain the following variables.

    MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/planmyplate  
    SECRET=aApz8UBmvP5cPWpL2H55EVekqAotK7EgUy4e2rk0  
    GOOGLE_API_KEY={insert Google API key here}  
    SPOONACULAR_URL=https://api.spoonacular.com/recipes  
    SPOONACULAR_API_KEY={insert Spoonacular API key here}

**Spoonacular API key**: Register for Spoonacular [here](https://spoonacular.com/food-api/console#Dashboard). 
Afterwards, you can obtain the API key through [here](https://spoonacular.com/food-api/console#Profile).
<br> (For the markers, API keys will be provided by us via Andrew)
<br> Note: the API usage is limited in the number of requests per day.


**Google API key**: Register for Google Maps API [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
<br> (For the markers, API keys will be provided by us via Andrew)
<br> Note: the API usage is limited in the number of requests.

### 2. Frontend Environment Variables
Create a .env file in the frontend folder. It should contain the following variables.

    VITE_GOOGLE_API_KEY={insert Google API key here}  
    VITE_API_BASE_URL=http://localhost:3000/api

### 3. Install Dependencies
Install backend and frontend dependencies by running the following command in their respective folders.
```
npm install
```

### 4. Initialize database
CD to the backend folder and run the following command to initialize the database.
```
npm run init-db
```

# Run the Application

### 1. Launch Backend Server  
CD to the backend folder, and start the server using the following command
```
npm start
```
### 2. Launch Frontend
CD to the backend folder, and start the frontend using the following command
```
npm run dev
```
#### Google Maps Note
Google Maps API does not work in China. To remedy this issue, try to use a VPN before launching our application.


# Test the application

### Backend Testing
CD to the backend folder and run the following command to run the backend tests
```
npm test
```
### Frontend Testing
CD to the frontend folder and run the following command to run the frontend tests
```
npm run test
```


# Application Features
### Home Page
This page presents recommended recipes to the user, organised into categories. 
The recommendations are based on user preferences.
### Search Recipes
Users can search for recipes through a variety of filters and keywords, including cuisine, diet, and type of meal.
### View Recipes
When the user clicks on a recipe, the application presents detailed information about the recipe. 
The information includes the ingredients, cooking steps, and nutritional information. 
The user can also comment on the recipe and rate the recipe through this page.
### Saved Recipes
Users can save recipes to their personal collection which can be accessed via the saved recipes page. 
### Create a Meal Schedule
The meal schedule page allows you to add saved recipes to a meal schedule. 
This allows users to plan what they want to cook throughout the week.
### Shopping List
A shopping list can be generated from the meal schedule. 
The list is created by compiling all the ingredients from the recipes within the meal plan.
### Nearby shops
From the shopping list page, you can choose to find the nearby supermarkets to purchase your ingredients.
### Authentication
Users can create an account by supplying a username and password during signup. Once registered, they can log in to track their saved recipes, meal schedule, and shopping list. Additionally, our authentication system enables users to rate and comment on recipes and modify their account information, including their user credentials and intolerances. 


# Additional Information
For more information, check out our wiki on this repository.

# Contact Us
Benjamin Goh        - bgoh684@aucklanduni.ac.nz  
Cameron Nathan      - cnat307@aucklanduni.ac.nz  
Yasith Udagedara    - yuda947@aucklanduni.ac.nz  
Yunqi Zheng         - yzhe583@aucklanduni.ac.nz  
Hok Lai Frankie Yu  - yhok562@aucklanduni.ac.nz  
Paul Lan            - slan526@aucklanduni.ac.nz
