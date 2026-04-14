import React, { useState } from 'react';
import './Grade.css';

const Grade = () => {
  // Initial list of students - in a real app, this would come from your MongoDB
  const [students, setStudents] = useState([
    { id: 1, name: 'Akanksha', rollNo: '101', marks: '', status: 'Pending' },
    { id: 2, name: 'Shreyas', rollNo: '102', marks: '', status: 'Pending' },
    { id: 3, name: 'Sajjan', rollNo: '103', marks: '', status: 'Pending' },
  ]);

  const handleMarksChange = (id, value) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        let status = 'Pending';
        if (value !== '') {
          status = value >= 35 ? 'Pass' : 'Fail';
        }
        return { ...student, marks: value, status: status };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const saveGrades = () => {
    console.log("Saving to NexGen Database:", students);
    alert("Grades saved successfully!");
  };

  return (
    <div className="grade-module">
      <div className="grade-header">
        <h3>Grade Management System</h3>
        <button className="save-all-btn" onClick={saveGrades}>Save All Changes</button>
      </div>
      
      <table className="grade-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Marks (100)</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>
                <input 
                  type="number" 
                  value={student.marks} 
                  onChange={(e) => handleMarksChange(student.id, e.target.value)}
                  placeholder="0-100"
                />
              </td>
              <td>
                <span className={`status-badge ${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grade;