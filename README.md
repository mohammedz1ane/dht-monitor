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

