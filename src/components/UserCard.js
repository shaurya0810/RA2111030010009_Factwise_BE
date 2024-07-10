import React, { useState } from 'react';
import '../styles.css';

const UserCard = ({ user, onDelete, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    onSave(editedUser);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className={`user-card ${isOpen ? 'open' : ''}`}>
      <div className="user-card-header" onClick={handleToggle}>
        <h3>{user.first} {user.last}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div className="user-card-body">
        <img src={user.picture} alt={`${user.first}`} />
        <p>Age: {user.age} Years</p>
        <p>
          Gender:
          <select
            name="gender"
            value={editedUser.gender}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="rather not say">Rather not say</option>
            <option value="other">Other</option>
          </select>
        </p>
        <p>
          Country:
          <input
            type="text"
            name="country"
            value={editedUser.country}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </p>
        <p>
          Description:
          <textarea
            name="description"
            value={editedUser.description}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </p>
        {isEditMode ? (
          <>
            <button onClick={handleSave} disabled={!isOpen}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
