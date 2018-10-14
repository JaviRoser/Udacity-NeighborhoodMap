# Udacity Project #7: Neighborhood Map

See live version: **https://javiroser.github.io/Udacity-NeighborhoodMap/**

## Project Overview

A simple React app showing BBQ restaurants around my neighborhood in Newark N.J. It uses FourSquare API and Google Maps API.

### Prerequisites

1. Install **node.js** in case you do not have it yet. 
2. Once it is installed, install the react package by typing **npm install -g create-react-app** in your command prompt/terminal

### Installing

3. Download the zip file or clone the repo onto your computer:
	-  **Download a zip File:** https://github.com/JaviRoser/MyReads/archive/master.zip
	-  **Clone a repo:**  git clone https://github.com/JaviRoser/MyReads.git

4. Once it is cloned or downloaded, install all**dependencies** with `npm install` or a package manager of your choice.
5. Open the root folder in a terminal and run this command:**npm start**
6. To load the map, open your code editor and edit your Google Maps API keys in **Map.js** file located in the components folder.
7. To fetch data from Foursuare API, edit the code with your **Client_ID & Client_Secret keys** in the **API.js** file located in the API folder.
6. The app will start in your default browser at **localhost:3000** in development mode.

### Service Workers
A service worker is created by default when installing the react package, but it will only cache the site when it is in production mode.

### Load the App in Production Mode

Since the project is built with Create React App, we will run:

`npm run build`

this is only necessary before deploying to production.

Then,

`serve -s build`

### Dependencies
- creat-react-app
- react
- react-burger-menu
- react-dom
- react-google-maps
- react-scripts
- Google Maps API
- FourSquare API
- Google Fonts
- Font Awesome

## How to use it
Each location has a marker, and when it is clicked, a info window will pop up and show data for each BBQ Restaurant. To filter 
the data, use the search input and search by name. When clearing the search, the original markers and list of restaurants appear.

## Website Layout
![neighborhood map](https://user-images.githubusercontent.com/25829140/46919416-0382dd80-cfad-11e8-9550-b31fa0927f12.JPG)

## Resources

https://reactjs.org/


## Acknowledgments

- Udacity
- **Credit to:** [Forrest Walker Walkthrough](https://www.youtube.com/watch?v=ktc8Gp9jD1k&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP)

## MIT License

This project is licensed under the terms of the MIT license


