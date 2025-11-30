import React, { useEffect, useState } from 'react';
import { getStudentScores } from '../services/api';

function Scores() {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      setError('Please login first');
      return;
    }
    const fetchScores = async () => {
      try {
        const data = await getStudentScores(user.email);
        setScores(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchScores();
  }, [user]);

  return (
    <div>
      <h2>My Scores</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {scores && (
        <div>
          <h3>Course: {scores.course_title}</h3> {/* Если несколько курсов — сделай map, но по схеме это один объект? Уточни если нужно */}
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Score</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {scores.tasks.map(task => (
                <tr key={task.task_id}>
                  <td>{task.task_title}</td>
                  <td>{task.answer.score}</td>
                  <td>{task.answer.teacher_comment || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Scores;