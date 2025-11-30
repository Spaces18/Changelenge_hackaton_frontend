import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyCourses from './pages/MyCourses';
import CourseDetails from './pages/CourseDetails';
import Scores from './pages/Scores';
import './App.css'; // Если добавишь стили

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Commit to Learn — Student Track</h1>
          <nav>
            <a href="/">All Courses</a> | <a href="/my-courses">My Courses</a> | <a href="/scores">Scores</a> | <a href="/register">Register</a> | <a href="/login">Login</a>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;