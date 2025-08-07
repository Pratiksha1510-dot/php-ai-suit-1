import React, { useState } from 'react';

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddAvailability = () => {
    if (!day || !startTime || !endTime) {
      alert('All fields are required');
      return;
    }

    const newSlot = {
      id: Date.now(),
      day_of_week: day,
      start_time: startTime,
      end_time: endTime,
    };

    setAvailability([...availability, newSlot]);

    // Reset form
    setDay('');
    setStartTime('');
    setEndTime('');
  };

  const handleDelete = (id) => {
    const filtered = availability.filter(slot => slot.id !== id);
    setAvailability(filtered);
  };

  return (
    <div className="container">
      <h2>Availability</h2>

      <div className="form-group">
        <label>Day of Week</label>
        <select className="form-control" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <div className="form-group">
        <label>Start Time</label>
        <input
          type="time"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>End Time</label>
        <input
          type="time"
          className="form-control"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <button className="btn btn-primary my-2" onClick={handleAddAvailability}>
        Add Availability
      </button>

      <h4>Added Slots</h4>
      {availability.length === 0 ? (
        <p>No availability records found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.day_of_week}</td>
                <td>{slot.start_time}</td>
                <td>{slot.end_time}</td>
                <td>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(slot.id)}>
                    ❌ Delete
                  </button>
                  {/* Future enhancement: edit slot */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Availability;
