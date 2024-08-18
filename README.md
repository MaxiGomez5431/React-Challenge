# React Challenge
This repository contains a React challenge with two main components: a heatmap using data fetched from a CSV file, and an interactive map where you can add pins and polygons

## Installation Instructions

### Clone the Repository
```
git clone https://github.com/MaxiGomez5431/React-Challenge
cd react-challenge
```

### Prerequisites
Node.js npm or yarn.

Install NPM packages:
```
npm install
```

### Run the Application
```
npm run dev
```

## Testing instruccions 

### Heatmap:

- The heatmap is displayed on the main page. You can compare the data with the source [here](https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/multivariate.csv).
- The data will not be downloaded more than once, as the page uses routing to manage this.

### Interactive map:

- You can zoom in and out using the mouse scroll.
- To add pins click on the map.
- To add a polygon, press the change mode button and click 3 times on the map.
