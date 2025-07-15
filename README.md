# Doctor Appointment System - Client

This is the frontend client for the Doctor Appointment System, a web application that allows patients and doctors to manage appointments, user profiles, and authentication.

## Features

-   User registration and login
-   Book, view, and manage appointments
-   Dashboard for users and doctors
-   Responsive and modern UI (React + Vite)
-   API integration with backend server

## Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and icons
│   ├── components/         # Reusable React components
│   │   └── Navbar.jsx
│   ├── pages/              # Application pages
│   │   ├── Appointments.jsx
│   │   ├── BookAppointmentDialog.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Users.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   ├── App.css             # App-wide styles
│   └── index.css           # Global styles
├── package.json            # Project metadata and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn package manager

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd hospital-management-system/client
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory if you need to override environment variables (e.g., API base URL):
    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

## Running the Client

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

-   Open [http://localhost:5173](http://localhost:5173) in your browser (default Vite port)
-   Register or log in as a user or doctor
-   Book, view, and manage appointments
-   Access dashboard and user management features

## API Integration

The client communicates with the backend server via RESTful API endpoints. Make sure the backend server is running and the API base URL is correctly set in your environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
