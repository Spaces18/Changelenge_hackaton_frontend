import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMyCourses, getMyAnswers } from '../services/api'; // Используем getMyCourses чтобы получить детали
import TaskCard from '../components/TaskCard';
import HomeworkForm from '../components/HomeworkForm';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      setError('Please login first');
      return;
    }
    const fetchCourse = async () => {
      try {
        const courses = await getMyCourses(user.email);
        const foundCourse = courses.find(c => c.course_id === parseInt(courseId));
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found or not enrolled');
        }
      } catch (err) {
        setError(err);
      }
    };
    fetchCourse();
  }, [courseId, user]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {course && (
        <>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <h3>Materials</h3>
          <ul>
            {course.materials.map(mat => (
              <li key={mat.mat_id}><a href={mat.url}>{mat.content_type}: {mat.url}</a></li>
            ))}
          </ul>
          <h3>Tasks</h3>
          {course.tasks.map(task => (
            <TaskCard key={task.task_id} task={task} userEmail={user?.email} />
          ))}
        </>
      )}
    </div>
  );
}

export default CourseDetails;