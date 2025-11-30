import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course, onEnroll, isMyCourse = false }) {
  return (
    <div className="card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      {!isMyCourse ? (
        <button onClick={() => onEnroll(course.course_id)}>Enroll</button>
      ) : (
        <Link to={`/courses/${course.course_id}`}>View Details</Link>
      )}
    </div>
  );
}

export default CourseCard;