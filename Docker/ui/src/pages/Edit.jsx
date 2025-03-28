import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCertificate = () => {

  const { certiid } = useParams();
  const navigate = useNavigate();

  const [coursename, setCoursename] = useState("");
  const [courseid, setCourseid] = useState("");
  const [candidatename, setCandidatename] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  
  const [message, setMessage] = useState(null);

  // Fetch certificate details on page load
  
  useEffect(() => {
  
    const fetchCertificate = async () => {
    
      try {
        const response = await fetch(`/api/certificate/${certiid}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        

        if (!response.ok) {
          throw new Error("Certificate not found");
        }
        

        const data = await response.json();
        
        setCoursename(data.certificate.COURSENAME);
        setCourseid(data.certificate.COURSEID);
        setCandidatename(data.certificate.CANDIDATENAME);
        setGrade(data.certificate.GRADE);
        setDescription(data.certificate.DESCRIPTION);
        setDate(data.certificate.DATE);
        
      } 
      
      catch (err) {
        setMessage(err.message);
      }
      
    };

    fetchCertificate();
    
  }, [certiid]);


  // Function to handle form submission (PATCH request)
  
  const handleUpdate = async (e) => {
  
    e.preventDefault();
    setMessage(null);

    try {
    
      const response = await fetch("/api/editcertificate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseid,
          courseName: coursename,
          candidatename,
          grade,
          description,
          date,
        }),
      });
      

      const result = await response.json();

      if (response.ok) {
      
        setMessage("Certificate updated successfully!");
        navigate("/home");
        
      } 
      
      else {
        setMessage(result.message || "Error updating certificate.");
      }
      
    } catch (error) {
      setMessage("Internal Server Error");
    }
    
  };

  return (
  
    <div className="bg-gray-200 py-12 min-h-screen flex flex-col items-center">
    
      <h3 className="text-center text-2xl font-bold">Edit Certificate</h3>
      {message && <p className="text-center text-red-500 font-bold">{message}</p>}
      

      <form onSubmit={handleUpdate} className="bg-cyan-50 w-6/12 shadow-lg shadow-teal-950 rounded-xl px-10 py-8">
      
        <div>
        
          <label className="font-bold">Course Name</label>
          <input type="text" value={coursename} onChange={(e) => setCoursename(e.target.value)} className="w-full ring-2 ring-red-400" required />
          
        </div>
        
        <br />

        <div>
        
          <label className="font-bold">Certificate ID (Non-editable)</label>
          <input type="text" value={courseid} readOnly className="w-full bg-gray-300 ring-2 ring-red-400" />
          
        </div>
        
        <br />

        <div>
        
          <label className="font-bold">Candidate Name</label>
          <input type="text" value={candidatename} onChange={(e) => setCandidatename(e.target.value)} className="w-full ring-2 ring-red-400" required />
          
        </div>
        
        <br />

        <div>
        
          <label className="font-bold">Grade</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full ring-2 ring-red-400">
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          
        </div>
        
        <br />

        <div>
          <label className="font-bold">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full ring-2 ring-red-400" required />
        </div>
        <br />

        <div>
        
          <label className="font-bold">Date</label>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full ring-2 ring-red-400" required />
          
        </div>
        
        <br />

        <div className="text-center">
        
          <button type="submit" className="bg-sky-700 text-white w-44 h-8 rounded-xl mt-4 hover:bg-red-400 hover:text-blue-900 font-bold">
            Update Certificate
          </button>
          
        </div>
        
      </form>
      
    </div>
    
  );
};

export default EditCertificate;

