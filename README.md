# Lululemon Clone Project

This project is a clone of the Lululemon website, mimicking its design and functionality to replicate the complete shopping experience. By fetching data from the Lululemon API, the app displays the 217 products and allows users to view product details, add items to the cart, and complete the purchase.

This project aims to demonstrate the ability to create a fully functional e-commerce app using React and Redux.

## Technologies Used
### Front-end:
- React
- Redux
- Redux Thunk
- React Router
- Axios
- MUI
- SCSS
- Lululemon API
- Responsive Design
- Local Storage
- Carousel
- Form Validation

### Back-end:
- Node.js
- Express
- RESTful API
- CORS
- PROXY


## Features

- Fetches data from the Lululemon API, including product details and filter bar information.
- Allows users to filter products by using the filter bar.
- Displays the preview of each product in home page.
- Displays the details of each product in the product page.
- Allows users to add items to the cart.
- Allows users to view the cart and remove items.
- Allows users to edit the quantity, color or size of items in the cart.
- Allows users to save for later.
- Allows users to complete the purchase.


## Deployment

- The app is deployed on Vercel. You can access the app [here](https://lululemon-clone.vercel.app/).  
- The app fetches data from the Lululemon API, the app may not work properly if the API is down.  
- Since the API is HTTP-only, whereas the app is deployed on HTTPS, the app may not work properly if the API is not configured to allow requests from the deployed domain. I have bulid a proxy server to handle the API requests, which allows the app to fetch data from the API without CORS issues.


## Disclaimer

This project is for educational purposes only and is not intended for commercial use. The project is a clone of the Lululemon website and is not affiliated with Lululemon Athletica Inc. in any way.

