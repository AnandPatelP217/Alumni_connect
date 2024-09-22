import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { Spinner } from "react-bootstrap";


const authorizationToken = localStorage.getItem('token');
const URL = `${API_URL}/api/v1/meeting/getAllMeeting`;

const ViewMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableHeight] = useState(500);

  const getAllMeetingData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMeetings(data);
      } else {
        console.error("Failed to fetch meetings:", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMeetingData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: `${tableHeight}px` }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : meetings.length === 0 ? (
          <div className="text-center text-muted mt-4">No Meetings Available</div>
        ) : (
          <div style={{ overflowY: 'auto', height: `${tableHeight}px`, border: '2px solid #007BFF', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Description</th>
                  {/* <th style={thStyle}>Organizer</th>
                  <th style={thStyle}>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting, index) => (
                  <tr key={meeting._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', cursor: 'pointer' }}>
                    <td style={tdStyle}>{meeting.title}</td>
                    <td style={tdStyle}>{new Date(meeting.date).toLocaleDateString()}</td>
                    <td style={tdStyle}>{meeting.time}</td>
                    <td style={tdStyle}>{meeting.location}</td>
                    <td style={tdStyle}>{meeting.description}</td>
                    {/* <td style={tdStyle}>{meeting.organizer}</td>
                    <td style={tdStyle}>{meeting.status}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const thStyle = {
  padding: '12px 15px',
  borderBottom: '2px solid #007BFF',
  borderRight: '2px solid #007BFF',
  backgroundColor: '#3a4fab',
  color: '#ffffff',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px 15px',
  borderBottom: '1px solid #000000',
  borderRight: '1px solid #000000',
  textAlign: 'left',
  color: '#000000',
 
};


export default ViewMeetings;
