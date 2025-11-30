import React, { useState, useEffect } from 'react';
import { getMyAnswers } from '../../services/api';
import HomeworkForm from './HomeworkForm';

function TaskCard({ task, userEmail }) {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userEmail) {
      const fetchAnswers = async () => {
        try {
          const data = await getMyAnswers(task.task_id, userEmail);
          setAnswers(data);
        } catch (err) {
          setError(err);
        }
      };
      fetchAnswers();
    }
  }, [task.task_id, userEmail]);

  return (
    <div className="card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      {task.attachment_url && <a href={task.attachment_url}>Attachment</a>}
      <h5>My Answers</h5>
      <ul>
        {answers.map(answer => (
          <li key={answer.id}>
            Version {answer.version}: <a href={answer.file_url}>File</a> (Score: {answer.score || 'Pending'})
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <HomeworkForm taskId={task.task_id} userEmail={userEmail} />
    </div>
  );
}

export default TaskCard;