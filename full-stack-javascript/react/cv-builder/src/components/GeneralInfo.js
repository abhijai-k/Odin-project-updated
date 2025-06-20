import React, { useState } from 'react';
import '../styles/GeneralInfo.css';

function GeneralInfo() {
  const [editMode, setEditMode] = useState(true);
  const [info, setInfo] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => setEditMode(false);
  const handleEdit = () => setEditMode(true);

  return (
    <div className="section">
      <h2>General Information</h2>
      {editMode ? (
        <>
          <input name="name" placeholder="Name" value={info.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={info.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={info.phone} onChange={handleChange} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {info.name}</p>
          <p><strong>Email:</strong> {info.email}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default GeneralInfo;
