import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import '../styles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/celebrities.json')
      .then(response => response.json())
      .then(data => {
        const usersWithAge = data.map(user => ({
          ...user,
          age: calculateAge(new Date(user.dob))
        }));
        setUsers(usersWithAge);
      });
  }, []);

  const calculateAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const filteredUsers = users.filter(user =>
    `${user.first} ${user.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>FactWise Assessment Visual Reference</h1>
      <input
        type="text"
        id="searchBar"
        placeholder="Search by celebrity name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      ))}
    </div>
  );
};

export default UserList;
