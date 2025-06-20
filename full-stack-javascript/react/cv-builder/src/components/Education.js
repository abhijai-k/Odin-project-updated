import React, { useState } from 'react';
import '../styles/Education.css';

function Education() {
  const [editMode, setEditMode] = useState(true);
  const [education, setEducation] = useState({
    education1: '',
    education2: '',
  });

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => setEditMode(false);
  const handleEdit = () => setEditMode(true);

  return (
    <div className="section">
      <h2>Educational Experience</h2>
      {editMode ? (
        <>
          <input
            name="education1"
            placeholder="Education 1"
            value={education.education1}
            onChange={handleChange}
          />
          <input
            name="education2"
            placeholder="Education 2"
            value={education.education2}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <p><strong>Education 1:</strong> {education.education1}</p>
          <p><strong>Education 2:</strong> {education.education2}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Education;
