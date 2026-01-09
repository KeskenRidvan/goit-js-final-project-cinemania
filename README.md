
# 🍿 Cinemania: Your Ultimate Movie Companion

Welcome to **Cinemania**! 🎬 This is a fantastic web application designed to help you discover and organize your favorite movies. Whether you're looking for the latest trends, searching for a specific film, or managing your personal movie library, Cinemania has got you covered. This project was developed as the final project for the GoIT JavaScript course.

## ✨ Features

- 🏠 **Homepage**: A welcoming page featuring weekly movie trends.
- 🎬 **Movie Catalog**: Browse a vast collection of movies with advanced filtering options.
- 🔍 **Search**: Quickly find movies by title.
- ℹ️ **Movie Details**: View detailed information about each movie in a clean, modern modal. This includes the trailer, rating, plot summary, and more.
- 📚 **My Library**: A personal space to keep track of movies you've watched or plan to watch.
- 🌓 **Theme Switcher**: Easily switch between a light and dark theme for comfortable viewing.
- 📱 **Responsive Design**: Enjoy a seamless experience on any device, be it desktop, tablet, or mobile.

## 🚀 Technologies Used

This project was built using a modern frontend stack:

- **HTML5**: For the structure of the application.
- **CSS3**: For styling and creating a beautiful user interface.
- **JavaScript**: For all the application logic and interactivity.
- **Vite**: A next-generation frontend build tool that provides a faster and leaner development experience.
- **Axios**: A promise-based HTTP client for making API requests to the movie database.
- **BasicLightbox**: A lightweight and powerful lightbox for displaying movie details.
- **Modern Normalize**: For CSS resets to ensure consistent styling across different browsers.
- **GitHub Pages**: For deploying the application.

## 📦 Installation and Usage

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/ridvankesken/goit-js-final-project-cinemania.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd goit-js-final-project-cinemania
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```

### Usage

-   **To run the development server:**
    ```sh
    npm run dev
    ```
    This will start a local server, and you can view the application in your browser at `http://localhost:5173/` (the port may vary).

-   **To build the project for production:**
    ```sh
    npm run build
    ```
    This will create a `dist` folder with the optimized and bundled files.

-   **To preview the production build:**
    ```sh
    npm run preview
    ```

## 📁 Project Structure

The project follows a component-based architecture, making it easy to navigate and maintain.

```
/
├─── src/
│    ├─── components/   # Reusable UI components (Header, Footer, Modal, etc.)
│    ├─── data/         # Static data like team information
│    ├─── images/       # All the images and icons
│    ├─── javascript/   # Global JavaScript files (theme switcher, utils)
│    ├─── pages/        # Page-specific styles and scripts
│    ├─── services/     # API clients and other services
│    └─── styles/       # Global styles, variables, and resets
├─── catalog/          # HTML file for the catalog page
├─── library/          # HTML file for the library page
├─── index.html        # Main HTML file for the homepage
└─── package.json      # Project dependencies and scripts
```

## 🧑‍💻 The Team

This project was brought to life by a dedicated developer:

-   **Rıdvan Kesken** - [GitHub Profile](https://github.com/ridvankesken)

---

Thank you for checking out Cinemania! We hope you enjoy using it as much as we enjoyed building it. If you have any suggestions or feedback, feel free to reach out. Happy movie watching! 🎥
