import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { message } from "antd";

const PostedMeetings = () => {
  const [meeting, setmeeting] = useState([]);
  const [tableHeight] = useState(500);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const [updatedMeetingData, setUpdatedMeetingData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    url: "",
    platform: "",
    location: "",
    feedback: "",
    attendedstudent:"",
  });

  const authorizationToken = localStorage.getItem("token");
  let userDataString = localStorage.getItem('userData');

  // Step 2: Parse the JSON string to a JavaScript object
  let userData = null;
  
  // Step 3: Access the _id field
  let userId = "";
  
  if (userDataString) {
    try {
      userData = JSON.parse(userDataString);
      userId = userData._id || "";
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  
  if (!userId) {
    console.error("User ID is missing or invalid.");
  }

  const meetingsURL = `${API_URL}/api/v1/meeting/getMeetingsByAlumni/${userId}`;

  const getAllMeetingData = async () => {
    try {
      const response = await fetch(meetingsURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setmeeting(data);
      } else {
        console.error("Failed to fetch meeting:", response);
      }
    } catch (error) {
      console.log("Error fetching meeting:", error);
    }
  };

  // Function to delete a Meeting
  const deleteMeeting = async (meetingId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/meeting/deleteMeetingById/${meetingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      if (response.ok) {
        getAllMeetingData();
        message.success("Meeting deleted successfully!");
      } else {
        console.error("Failed to delete Meeting:", response);
      }
    } catch (error) {
      console.error("Error deleting Meeting:", error);
    }
  };

  // Function to handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMeetingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to update a Meeting using PATCH
  const updateMeeting = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/meeting/updateMeetingById/${selectedMeeting._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authorizationToken}`,
          },
          body: JSON.stringify(updatedMeetingData),
        }
      );

      if (response.ok) {
        getAllMeetingData();
        message.success("Meeting updated successfully!");
        setSelectedMeeting(null); // Close the update form
      } else {
        console.error("Failed to update Meeting:", response);
      }
    } catch (error) {
      console.error("Error updating Meeting:", error);
    }
  };

  // Function to count attending and not attending students
  const countAttendees = (attendees) => {
    const attending = attendees.filter((attendee) => attendee.isAttending).length;
    const notAttending = attendees.filter((attendee) => !attendee.isAttending).length;
    return { attending, notAttending };
  };

  useEffect(() => {
    if (userId) {
      getAllMeetingData();
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <div>
        {meeting.length === 0 ? (
          <div>No meeting Available</div>
        ) : (
          <div
            style={{
              overflowY: "auto",
              height: `${tableHeight}px`,
              border: "2px solid #007BFF",
              borderRadius: "8px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>URL</th>
                  <th style={thStyle}>Platform</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Feedback</th>
                  <th style={thStyle}>Total Attended Students </th>
                  <th style={thStyle}>Attending</th> {/* New column for attendees */}
                  <th style={thStyle}>Not Attending</th> {/* New column for not attending */}
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {meeting.map((Meeting) => {
                  const { attending, notAttending } = countAttendees(Meeting.attendees);
                  return (
                    <tr key={Meeting._id}>
                      <td style={tdStyle}>{Meeting.title}</td>
                      <td style={tdStyle}>{Meeting.description}</td>
                      <td style={tdStyle}>{new Date(Meeting.date).toLocaleDateString()}</td>
                      <td style={tdStyle}>{Meeting.time}</td>
                      <td style={tdStyle}>
                        <a href={Meeting.url} target="_blank" rel="noopener noreferrer">
                          Link
                        </a>
                      </td>
                      <td style={tdStyle}>{Meeting.platform}</td>
                      <td style={tdStyle}>{Meeting.location}</td>
                      <td style={tdStyle}>{Meeting.feedback}</td>
                      <td style={tdStyle}>{Meeting.attendedstudent}</td>
                      <td style={tdStyle}>{attending}</td> {/* Display count of attending */}
                      <td style={tdStyle}>{notAttending}</td> {/* Display count of not attending */}
                      <td style={tdStyle}>
                        <button
                          style={updateButtonStyle}
                          onClick={() => {
                            setSelectedMeeting(Meeting);
                            setUpdatedMeetingData(Meeting); // Pre-fill form with current data
                          }}
                        >
                          Update
                        </button>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => deleteMeeting(Meeting._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

       {/* Update Form */}
{selectedMeeting && (
  <div style={updateFormStyle}>
    <h3 style={formHeadingStyle}>Update Meeting</h3>
    <form style={formStyle}>
      <label style={labelStyle}>Title</label>
      <input
        type="text"
        name="title"
        value={updatedMeetingData.title}
        onChange={handleInputChange}
        placeholder="Enter meeting title"
        style={inputStyle}
      />

      <label style={labelStyle}>Description</label>
      <textarea
        name="description"
        value={updatedMeetingData.description}
        onChange={handleInputChange}
        placeholder="Enter meeting description"
        style={textareaStyle}
      />

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        name="date"
        value={updatedMeetingData.date.split("T")[0]} // Format date to YYYY-MM-DD
        onChange={handleInputChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Time</label>
      <input
        type="time"
        name="time"
        value={updatedMeetingData.time}
        onChange={handleInputChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Meeting URL</label>
      <input
        type="text"
        name="url"
        value={updatedMeetingData.url}
        onChange={handleInputChange}
        placeholder="Enter meeting URL"
        style={inputStyle}
      />

      <label style={labelStyle}>Platform</label>
      <input
        type="text"
        name="platform"
        value={updatedMeetingData.platform}
        onChange={handleInputChange}
        placeholder="Enter meeting platform"
        style={inputStyle}
      />

      <label style={labelStyle}>Location</label>
      <input
        type="text"
        name="location"
        value={updatedMeetingData.location}
        onChange={handleInputChange}
        placeholder="Enter meeting location"
        style={inputStyle}
      />

      <h5 style={sectionHeadingStyle}>Give Meeting Feedback</h5>
      <input
        type="text"
        name="feedback"
        value={updatedMeetingData.feedback}
        onChange={handleInputChange}
        placeholder="Enter feedback"
        style={inputStyle}
      />

      <h5 style={sectionHeadingStyle}>Number of Total Students Attended</h5>
      <input
        type="number"
        name="attendedstudent"
        value={updatedMeetingData.attendedstudent}
        onChange={handleInputChange}
        placeholder="Enter number of students attended"
        style={inputStyle}
      />

      <div style={buttonContainerStyle}>
        <button
          type="button"
          style={saveButtonStyle}
          onClick={updateMeeting}
        >
          Save Changes
        </button>
        <button
          type="button"
          style={cancelButtonStyle}
          onClick={() => setSelectedMeeting(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}
    </div>
    </DashboardLayout>
  );
};

// Styles for the table headers, table data, buttons, and form
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

const buttonStyle = {
  padding: "8px 15px",
  marginTop: "2px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  marginRight: "10px",
  width:"0px", 
}

const updateButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};
  const updateFormStyle = {
    marginTop: "20px",
    padding: "20px",
    border: "2px solid #007BFF",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };
  // Styles for the form
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f0f4f8",
  border: "2px solid #007BFF",
};

const formHeadingStyle = {
  textAlign: "center",
  marginBottom: "15px",
  color: "#007BFF",
};

const sectionHeadingStyle = {
  fontWeight: "600",
  marginBottom: "10px",
  color: "#333",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#333",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
  resize: "vertical",
  minHeight: "100px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const saveButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

  export default PostedMeetings;
  