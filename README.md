# Node.js User Distance API

This Node.js application provides a REST API to find and sort users within a 10-kilometer radius of given coordinates using the Haversine formula. The application uses MongoDB to store and manage user data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Seeding the Database](#seeding-the-database)
- [Testing the API](#testing-the-api)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- **Node.js** (>= 18.x)
- **MongoDB** (local or remote)

## Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**

   Install the necessary Node.js packages using npm:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory of your project and add the following variables:

   ```env
   MONGO_URL=
   PORT=3000
   ```

   
## Running the Application

1. **Start the Server**

   To start the server, run:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000` by default.

2. **Test the API**

   You can test the API endpoints using tools like Thunder Client or Postman. Here is an example of how to test the `/api/users` endpoint:

   ```http
   GET http://localhost:3000/api/users?lat=<latitude>&lon=<longitude>&page=1&limit=10
   ```

   Replace `<latitude>` and `<longitude>` with the coordinates you want to test.

## Seeding the Database

To seed the MongoDB database with sample user data:

1. **Create a Seed Script**

   Ensure the `seed.js` script is present in the root directory of your project.

2. **Run the Seed Script**

   Execute the script to populate the database:

   ```bash
   node seed.js
   ```

   This will insert 30 users with random coordinates around a central location.

## Testing the API

After seeding the database, you can test the API to ensure it returns users within the specified radius:

1. **Test with Valid Coordinates**

   Use the following example coordinates for testing:

   - Latitude: `37.7749`
   - Longitude: `-122.4194`

   Example API Request:

   ```http
   GET http://localhost:3000/api/users?lat=37.7749&lon=-122.4194&page=1&limit=10
   ```

2. **Verify Results**

   Ensure that the response includes users within the 10-kilometer radius of the provided coordinates.

## Contributing

If you want to contribute to this project:

1. **Fork the Repository**

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add your message"
   ```

4. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature
   ```

5. **Create a Pull Request**

   Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the content as needed for your specific project and environment. If you need any additional sections or modifications, just let me know!
