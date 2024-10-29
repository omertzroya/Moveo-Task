# JaMoveo 🎵

JaMoveo is a real-time web application for musical rehearsals, enabling band members to coordinate and share song lyrics and chords. The app features a modern, dark-themed UI with role-based access for administrators and musicians.

## Tech Stack 🛠️

### Frontend
- React.js
- Tailwind CSS
- Lucide React (for icons)
- Socket.io-client
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.io

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Setup**

Create `.env` in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

Create `.env` in backend directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Start the application**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

Built with ❤️ for Moveo
