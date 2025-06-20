import React, { useState } from 'react';
import '../styles/Experience.css';

function Experience() {
  const [editMode, setEditMode] = useState(true);
  const [experience, setExperience] = useState({
    experience1: '',
    experience2: '',
  });

  const handleChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => setEditMode(false);
  const handleEdit = () => setEditMode(true);

  return (
    <div className="section">
      <h2>Practical Experience</h2>
      {editMode ? (
        <>
          <input
            name="experience1"
            placeholder="Experience 1"
            value={experience.experience1}
            onChange={handleChange}
          />
          <input
            name="experience2"
            placeholder="Experience 2"
            value={experience.experience2}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <p><strong>Experience 1:</strong> {experience.experience1}</p>
          <p><strong>Experience 2:</strong> {experience.experience2}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Experience;
