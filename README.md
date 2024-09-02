
# Book My Court Website

It's a frontend and backend project. It's a sport facility providing platform.

## Project Name:

Book My Court

## Live URL:

- [Book My Court Client](https://book-my-court.vercel.app/)

- [Book My Court Server](https://facility-booking-backend-system.vercel.app/)

## Features:

- **Create Facility and Book Facility.**

- **Delete Facility and Cancel Booking.** 

- **Update Facility and Remove.**

- **Create Booking.** (Customer details needed)

- **Filter and Pagination System.**

- **Authentication and Authorization.**


## Technology Used

- **Redux Toolkit**: A streamlined toolset for efficient Redux development, offering simplified state management, reducers, and middleware configuration.

- **Tailwind CSS**: A utility-first CSS framework enabling rapid UI development with pre-designed classes for styling directly in HTML.

- **React**: A popular JavaScript library for building dynamic user interfaces, known for its component-based architecture and efficient DOM updates with a virtual DOM.

- **shadcn/ui**: A modern and flexible React component library built with Tailwind CSS, providing pre-designed and customizable UI components for rapid development.

- **cookie-parser**: Middleware for handling cookies in Express.js applications, allowing easy parsing and manipulation of cookies.

- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js, allowing your server to accept requests from different origins.

- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, facilitating the configuration of environment-specific variables.

- **express**: A fast, unopinionated, minimalist web framework for Node.js, used for building web applications and APIs.

- **http-status**: A utility to interact with HTTP status codes, providing constants and descriptions for standard HTTP status codes.

- **ts-node-dev**: A development tool that combines `ts-node` with `nodemon`, enabling automatic restarts and TypeScript compilation for faster development cycles.

- **typescript**: A strongly typed programming language that builds on JavaScript, adding static type definitions to help catch errors early in the development process.

- **MongoDB**: NoSQL database.

- **Swiper.js**: It's popular library for creating slider.

- **Antd**: It's ui component library.

## Installation

To set up the project locally, follow these steps:

**1. Clone the repository**:

- Clone repository for `Client`:

```bash
git clone https://github.com/Utsho11/facility-booking-client.git
```
- Clone repository for `Server`:

```bash
git clone https://github.com/Utsho11/facility-booking-backend-system.git
```

**2. Go to the project directory:**

Please change my-project with the main directory here. 

```bash
cd my-project
```
 

**3. Install dependencies**:

Open your terminal and run these commands to set npm.

```bash
1. npm init -y
    
2. npm install
```

**4. Set up environment variables**:

Create a `.env` file in the root of the project and add the following variables:

- **For Client:**

Create an `.env.local` file at the same level of `package.json` file.

```bash
VITE_IMAGE_UPLOAD_TOKEN = put your imagebb api
VITE_PUBLIC_KEY = put your public key
VITE_SERVICE_ID = put your service id
VITE_TEMPLATE_ID = put your template id
```

**5. Run the application**:

You can run both client and server by following this command.

```bash
npm run dev
```
