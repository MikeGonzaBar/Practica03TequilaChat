# TequilaChat

A real-time chat application built with Node.js, Express, and MongoDB that allows users to create channels, send messages, and communicate with others.

## 🚀 Features

- **User Authentication**: Register and login with email/password
- **Channel Management**: Create and join chat channels
- **Real-time Messaging**: Send and receive messages in channels
- **JWT Authentication**: Secure token-based authentication
- **API Documentation**: Complete Swagger documentation
- **MongoDB Integration**: Persistent data storage

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MikeGonzaBar/Practica03TequilaChat.git
   cd Practica03TequilaChat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   DB_URL=mongodb://localhost:27017/tequilachat
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
```
http://localhost:3000/swagger
```

### Available Endpoints

#### Authentication
- `POST /api/logins` - Login with email and password
- `GET /api/logins` - Get all login records

#### Users
- `POST /api/users` - Register a new user
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID

#### Channels
- `POST /api/channels` - Create a new channel (requires authentication)
- `GET /api/channels` - Get all channels
- `GET /api/channels/invite/:inviteUrl` - Join a channel via invite link

#### Messages
- `POST /api/messages/:channelId` - Send a message to a channel
- `GET /api/messages/:channelId` - Get all messages from a channel

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login using `POST /api/logins` with your email and password
2. Include the returned token in the `x-auth` header for subsequent requests

Example:
```bash
curl -H "x-auth: YOUR_JWT_TOKEN" http://localhost:3000/api/channels
```

## 📁 Project Structure

```
Practica03TequilaChat/
├── src/
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication and validation
│   ├── models/          # Database models
│   └── routes/          # API routes
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Development**: Nodemon

## 👨‍💻 Author

**Miguel González Barajas**
- Email: is722298@iteso.mx
- GitHub: [MikeGonzaBar](https://github.com/MikeGonzaBar)

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub Issues page](https://github.com/MikeGonzaBar/Practica03TequilaChat/issues).