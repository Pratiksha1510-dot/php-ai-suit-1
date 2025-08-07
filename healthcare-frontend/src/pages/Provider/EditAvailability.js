// src/pages/Provider/EditAvailabilityPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

const EditAvailabilityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    day_of_week: '',
    start_time: '',
    end_time: '',
    slot_duration: '',
    location: '',
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await api.get(`/provider/availability/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/provider/availability/${id}`, formData);
      navigate('/provider/availability');
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Availability</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Day of Week</label>
          <select
            name="day_of_week"
            className="form-control"
            value={formData.day_of_week}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Day --</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-3">
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            className="form-control"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            className="form-control"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Slot Duration (minutes)</label>
          <input
            type="number"
            name="slot_duration"
            className="form-control"
            value={formData.slot_duration}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          💾 Save Changes
        </button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditAvailabilityPage;
