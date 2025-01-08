Okay, here's a comprehensive README.md file tailored for your DHT monitor project, keeping in mind the features and technologies you've used, and with a structure designed for clarity on GitHub.

```markdown
# DHT Sensor Monitoring Dashboard

A React-based web application for real-time monitoring of temperature and humidity data from a DHT sensor. This application features a user-friendly dashboard that displays data in both tabular and graphical formats, along with user authentication and theming options.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Functionalities](#functionalities)
-   [Authentication](#authentication)
-   [Theming](#theming)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Real-Time Data Visualization:** Displays live temperature and humidity readings.
-   **Dynamic Graphs:** Presents data in interactive line charts.
-   **Data Table:** Shows historical data in a sortable table with filters.
-   **Date Range Selection:** Ability to filter data by date, month and year for graphs and tables.
-   **Temperature Range Selection:** Filter table data by specific temperature range.
    *   Humidity Range Selection: Filter table data by specific humidity range.
-    **Top Count Selection**: Filter table data to see the top entries.
-   **Incidents Page:** A dedicated page for visualizing incidents where the temperature exceeds normal thresholds.
-   **PDF and JSON Download:** Download data in PDF and JSON formats.
-   **Local Storage Based Authentication:** Uses a simple username/password (`admin`/`admin`) for initial access.
-   **Theming:** Includes a switch between a light and dark theme, saved in local storage.
-   **Mobile Responsive**: Designed to be functional for all kind of devices.
-    **Animated Header**: A nice blur effect is used for the title on the header.
## Technologies Used

-   **React.js:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool for front-end development.
-   **Tailwind CSS:** A utility-first CSS framework for styling.
-   **Axios:** For making HTTP requests to fetch data.
-   **React-Chartjs-2 & Chart.js:**  For displaying interactive charts.
-   **React-Icons:** For using various icons.
-    `html2canvas`: for generating PDF in better way.
-   `jspdf`: for generating pdf document
-   `@headlessui/react` for dropdown menus.
-    `@heroicons/react`: for using heroicons.
-  `json2csv` for downloading data to csv format

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18 or higher) and npm (or yarn) installed.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/mohammedz1ane/dht-monitor.git
    cd dht-monitor
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

```bash
npm run dev
```

Open your browser and go to the provided address.

## Project Structure

```
dht-monitor/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── DataTable.jsx
│   │   ├── TemperatureChart.jsx
│   │   ├── HumidityChart.jsx
│   │   ├── DataDisplay.jsx
│   │   ├── Header.jsx
│   │   ├── Login.jsx
│   │   ├── Footer.jsx
│   │   ├── CombinedChart.jsx
│   │   ├── Incidents.jsx
|   |   └── BlurText.jsx
│   ├── hooks/
│   │   └── useFetchData.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   ├── main.jsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

*   `src/components`: Contains React components for UI elements and graphs.
    *   `DataTable.jsx`:  Component to display data in a table.
    *   `TemperatureChart.jsx`: Component for the temperature graph.
    *   `HumidityChart.jsx`: Component for the humidity graph.
    *   `DataDisplay.jsx`: A component to display the lastest data.
    *    `Header.jsx`: A component for the application's header
     *   `Login.jsx`: A component for the login page.
    *   `Footer.jsx`: A component for the application's footer.
    *   `CombinedChart.jsx`: Component to display graphs using a combined design with buttons to switch visibility.
     *  `Incidents.jsx`: Component for displaying incident data.
    *  `BlurText.jsx`: A component to make text blur with animation.
*   `src/hooks`: Contains custom hooks.
    *   `useFetchData.js`: Custom hook for fetching data.
*   `src/styles`: Contains CSS files.
    *   `index.css`: Global styles, Tailwind CSS directives and component style overrides.
*   `src/App.jsx`: Root component of the application.
*   `src/main.jsx`: Entry point of the application.

## Functionalities

*   **Homepage:** Displays the most recent DHT sensor data, a combined chart with options to display individual or combined charts, and a sortable data table with date, temperature, humidity, and top results filters.
*   **Incidents Page:** Lists all data where the temperature is outside the normal range and allows the user to download all table data on a PDF document and filter by time and temperature range.
*   **Authentication**: Provides a basic authentication system where you can log in by the username `admin` and password `admin`.
*   **Theming**: The user has option to switch from a light to a dark theme using the header button and theme is also saved to the localstorage.
*  **Download Data**: You can download filtered data to PDF or Json format.
*   **Animated Header** : The title in the header will have a cool animated blur effect.
## Authentication

The application uses a basic local storage-based authentication. When prompted to log in use username: `admin` and password: `admin`. Your login is saved in the local storage until you logout.

## Theming

The application provides a toggle to switch from a light and a dark theme. The selected theme is also saved in the local storage so it will persist after page refresh.

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Open a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
```

