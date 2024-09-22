import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";

const authorizationToken = localStorage.getItem('token');
const vacanciesURL = `${API_URL}/api/v1/vacancy/getAllVacancies`;
const studentsURL = `${API_URL}/api/v1/admin/getAllStudent`;

const ViewVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [matchingStudents, setMatchingStudents] = useState([]);
  const [tableHeight] = useState(500);
  const [isAdminApproved, setIsAdminApproved] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const getAllVacancyData = async () => {
    try {
      const response = await fetch(vacanciesURL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVacancies(data);
      } else {
        console.error("Failed to fetch vacancies:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStudentData = async () => {
    try {
      const response = await fetch(studentsURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const findMatchingStudents = (vacancyId, vacancySkills) => {
    const rankedStudents = students
      .map((student) => {
        const matchingSkillsCount = student.skills.filter((skill) =>
          vacancySkills.includes(skill)
        ).length;
        return { ...student, matchingSkillsCount };
      })
      .filter((student) => student.matchingSkillsCount > 0)
      .sort((a, b) => b.matchingSkillsCount - a.matchingSkillsCount)
      .slice(0, 10);

    setSelectedVacancy(vacancyId);
    setMatchingStudents(rankedStudents);
  };

  const printMatchingStudents = () => {
    window.print();
  };

  const handleApprovalRequest = (vacancyId, matchingStudents) => {
    // vacancy id
    console.log("vacancy in approval id: ",vacancyId);
    console.log("students in matching id: ",matchingStudents);
    // students arrray 
    setShowApprovalModal(true);
  };

  const approveRequest = async () => {
    setIsAdminApproved(true);
    setShowApprovalModal(false);

    console.log('vacancy: ',selectedVacancy);
    console.log('students: ',matchingStudents.map(student => student._id));
    
    try {
      const response = await fetch(`${API_URL}/api/v1/vacancy/${selectedVacancy}/recommended-students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorizationToken}`,
        },
        body: JSON.stringify({
          studentIds: matchingStudents.map(student => student._id),
        }),
      });
  
      if (response.ok) {
        alert("Top 10 students sent to alumni successfully!");
      } else {
        console.error("Failed to send data to alumni:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to alumni:", error);
    }
  };
  

  useEffect(() => {
    getAllVacancyData();
    getAllStudentData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        {vacancies.length === 0 ? (
          <div>No Vacancies Available</div>
        ) : (
          <div style={{ overflowY: 'auto', height: `${tableHeight}px`, border: '2px solid #007BFF', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Position</th>
                  <th style={thStyle}>Company</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Salary</th>
                  <th style={thStyle}>Requirements</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Seleted Student </th>
                  {/* <th style={thStyle}>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {vacancies.map((vacancy) => (
                  <React.Fragment key={vacancy._id}>
                    <tr>
                      <td style={tdStyle}>{vacancy.position}</td>
                      <td style={tdStyle}>{vacancy.company}</td>
                      <td style={tdStyle}>{vacancy.location}</td>
                      <td style={tdStyle}>{vacancy.salary}</td>
                      <td style={tdStyle}>{vacancy.requirements.join(', ')}</td>
                      <td style={tdStyle}>{vacancy.description}</td>
                      {/* <td style={tdStyle}>{vacancy.status}</td> */}
                      <td style={tdStyle}>
                        <button
                          onClick={() => findMatchingStudents(vacancy._id, vacancy.requirements)}
                          style={buttonStyle}
                        >
                          Find Matching Students
                        </button>
                      </td>
                    </tr>
                    {selectedVacancy === vacancy._id && matchingStudents.length > 0 && (
                      <tr>
                        <td colSpan="8">
                          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #007BFF', borderRadius: '8px' }}>
                            <h4>Top 10 Matching Students</h4>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr>
                                  <th style={thStyle}>Name</th>
                                  <th style={thStyle}>Skills</th>
                                  <th style={thStyle}>Matching Skills</th>
                                </tr>
                              </thead>
                              <tbody>
                                {matchingStudents.map((student) => (
                                  <tr key={student._id}>
                                    <td style={tdStyle}>{student.name}</td>
                                    <td style={tdStyle}>{student.skills.join(', ')}</td>
                                    <td style={tdStyle}>{student.matchingSkillsCount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <button
                              onClick={printMatchingStudents}
                              style={printButtonStyle}
                            >
                              Print Matching Students
                            </button>
                            <button
                              onClick={()=>handleApprovalRequest(vacancy._id, matchingStudents)}
                              style={approvalButtonStyle}
                            >
                              Send the Data to Alumni
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for approval */}
        {showApprovalModal && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h4>Admin Approval</h4>
              <p>Are you sure you want to send the top 10 students to alumni?</p>
              <button onClick={approveRequest} style={approveButtonStyle}>Yes, Approve</button>
              <button onClick={() => setShowApprovalModal(false)} style={cancelButtonStyle}>Cancel</button>
            </div>
          </div>
        )}
      </div>
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
  padding: '8px 12px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
  marginTop: '10px',
};

const printButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#28a745', // Green color for the print button
};
const approvalButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ffc107', // Yellow for the approval button
};
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};
const approveButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#28a745', // Green for approval confirmation button
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#dc3545', // Red for the cancel button
};
export default ViewVacancies;
