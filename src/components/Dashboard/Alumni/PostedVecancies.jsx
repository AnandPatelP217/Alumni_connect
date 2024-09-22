import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { message, Modal, Table } from "antd";

const PostedVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [tableHeight] = useState(500);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // For controlling the popup visibility

  const [updatedVacancyData, setUpdatedVacancyData] = useState({
    position: "",
    company: "",
    location: "",
    salary: "",
    requirements: "",
    description: "",
    status: "",
  });

  const authorizationToken = localStorage.getItem("token");
  let userDataString = localStorage.getItem("userData");

  let userData;
  let userId;

  try {
    userData = JSON.parse(userDataString);
    userId = userData?._id;
  } catch (error) {
    console.error("Error parsing user data:", error);
    userData = null;
    userId = null;
  }

  const vacanciesURL = `${API_URL}/api/v1/vacancy/getVacanciesByAlumni/${userId}`;

  const getAllVacancyData = async () => {
    try {
      const response = await fetch(vacanciesURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVacancies(data);
      } else {
        console.error("Failed to fetch vacancies:", response);
      }
    } catch (error) {
      console.log("Error fetching vacancies:", error);
    }
  };

  // Function to delete a vacancy
  const deleteVacancy = async (vacancyId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vacancy/deleteVacancy/${vacancyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      if (response.ok) {
        getAllVacancyData();
        message.success("Job deleted successfully!");
      } else {
        console.error("Failed to delete vacancy:", response);
      }
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
  };

  // Function to handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVacancyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to update a vacancy using PATCH
  const updateVacancy = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vacancy/updateVacancy/${selectedVacancy._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authorizationToken}`,
          },
          body: JSON.stringify(updatedVacancyData),
        }
      );

      if (response.ok) {
        getAllVacancyData();
        message.success("Vacancy updated successfully!");
        setSelectedVacancy(null); // Close the update form
      } else {
        console.error("Failed to update vacancy:", response);
      }
    } catch (error) {
      console.error("Error updating vacancy:", error);
    }
  };

  // Function to fetch recommended students for a vacancy
  const fetchRecommendedStudents = async (vacancyId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vacancy/${vacancyId}/recommended-students`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      if (response.ok) {
        const studentsData = await response.json();
        setRecommendedStudents(studentsData.recommended_students);
      
        setIsModalVisible(true); // Show the modal with student data
      } else {
        console.error("Failed to fetch students:", response);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Columns for the recommended students table
  const studentColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
     
    },
    {
      title: "Roll",
      dataIndex: "roll",
      key: "roll",
    },
    {
      title: "Batch",
      dataIndex: "batch_start",
      key: "batch",
      render: (text, record) => `${record.batch_start} - ${record.batch_end}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => skills.join(", "),
    },
    {
      title: "Certificates",
      dataIndex: "certificates",
      key: "certificates",
      render: (certificates) =>
        certificates.map((cert) => `${cert.certificateName} (${cert.issuedBy})`).join(", "),
    },
  ];

  useEffect(() => {
    if (userId) {
      getAllVacancyData();
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <div>
        {vacancies.length === 0 ? (
          <div>No Vacancies Available</div>
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
                  <th style={thStyle}>Position</th>
                  <th style={thStyle}>Company</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Salary</th>
                  <th style={thStyle}>Requirements</th>
                  <th style={thStyle}>Description</th>
                  {/* <th style={thStyle}>Status</th> */}
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {vacancies.map((vacancy) => (
                  <tr key={vacancy._id}>
                    <td style={tdStyle}>{vacancy.position}</td>
                    <td style={tdStyle}>{vacancy.company}</td>
                    <td style={tdStyle}>{vacancy.location}</td>
                    <td style={tdStyle}>{vacancy.salary}</td>
                    <td style={tdStyle}>{vacancy.requirements.join(", ")}</td>
                    <td style={tdStyle}>{vacancy.description}</td>
                    {/* <td style={tdStyle}>{vacancy.status}</td> */}
                    <td style={tdStyle}>
                      {/* Update Button to open update form */}
                      <button
                        style={updateButtonStyle}
                        onClick={() => {
                          setSelectedVacancy(vacancy);
                          setUpdatedVacancyData(vacancy); // Pre-fill form with current data
                        }}
                      >
                        Update
                      </button>
                      
                      <button
                        style={deleteButtonStyle} 
                        onClick={() => deleteVacancy(vacancy._id)}
                      >
                        Delete
                      </button>
                      {/* Button to fetch recommended students */}
                      <button
                        style={showStudentsButtonStyle}
                        onClick={() => fetchRecommendedStudents(vacancy._id)}
                      >
                        Show Recommended Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Form */}
        {selectedVacancy && (
          <div style={updateFormStyle}>
            <h3>Update Vacancy</h3>
            <form>
              <input
                type="text"
                name="position"
                value={updatedVacancyData.position}
                onChange={handleInputChange}
                placeholder="Position"
              />
              <input
                type="text"
                name="company"
                value={updatedVacancyData.company}
                onChange={handleInputChange}
                placeholder="Company"
              />
              <input
                type="text"
                name="location"
                value={updatedVacancyData.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
              <input
                type="text"
                name="salary"
                value={updatedVacancyData.salary}
                onChange={handleInputChange}
                placeholder="Salary"
              />
              <textarea
                name="requirements"
                value={updatedVacancyData.requirements}
                onChange={handleInputChange}
                placeholder="Requirements"
              />
              <textarea
                name="description"
                value={updatedVacancyData.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <button type="button" 
               style={deleteButtonStyle}
               onClick={updateVacancy}>
                Save Changes
              </button>
              <button
                type="button"
                style={deleteButtonStyle}
                onClick={() => setSelectedVacancy(null)}
                
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      
       {/* Modal to show recommended students */}
       <Modal
        title="Recommended Students"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={studentColumns}
          dataSource={recommendedStudents}
          rowKey="_id"
          pagination={false}
        />
      </Modal>
    </DashboardLayout>
  );
};

// Inline styles for table headers, cells, buttons
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
  width: "100px", // Set a fixed width
  whiteSpace: "nowrap", // Prevent the text from wrapping to the next line
  overflow: "hidden", // Hide the overflowing text
  textOverflow: "ellipsis", // Add ellipsis (...) for overflowed text
  textAlign: "center", // Center the text inside the button
};


const showStudentsButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#2ECC40",
   // Green color for the show students button
};

const updateButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745", // Green color for the update button
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545", // Red color for the delete button
};

const updateFormStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  marginTop: "20px",
  backgroundColor: "#f9f9f9",
};

export default PostedVacancies;
