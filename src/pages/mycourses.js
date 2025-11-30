import React, { useEffect, useState } from 'react';
import { getMyCourses } from '../services/api';
import CourseCard from '../components/CourseCard';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      setError('Please login first');
      return;
    }
    const fetchCourses = async () => {
      try {
        const data = await getMyCourses(user.email);
        setCourses(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchCourses();
  }, [user]);

  return (
    <div>
      <h2>My Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {courses.map(course => (
        <CourseCard key={course.course_id} course={course} isMyCourse={true} />
      ))}
    </div>
  );
}

export default MyCourses;