import React, { useEffect, useState } from 'react';
import { getAllCourses, enrollInCourse } from '../services/api';
import CourseCard from '../components/CourseCard';

function Home() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) return alert('Please login first');
    try {
      await enrollInCourse(user.email, courseId);
      alert('Enrolled successfully!');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <h2>All Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {courses.map(course => (
        <CourseCard key={course.course_id} course={course} onEnroll={handleEnroll} />
      ))}
    </div>
  );
}

export default Home;