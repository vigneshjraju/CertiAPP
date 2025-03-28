import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const IssueCertificate = () => {
  const [Coursename, setCoursename] = useState("Certificate Blockchain Associate");
  const [Courseid, setCourseid] = useState("");
  const [Candidatename, setCandidatename] = useState("");
  const [Grade, setGrade] = useState("S");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    
    setMessage(null);

    try {
      const response = await fetch("/api/issuecertificate", {
      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        
        body: JSON.stringify(
            { 
                courseName:Coursename,
                courseId:Courseid,
                candidatename:Candidatename,
                grade:Grade,
                description: Description,
				date:Date

                }),
        
      });

      const result = await response.json();
      
      if (response.ok) {
      
        setMessage("Certificate Issued Successfully!");
        navigate("/home");
        
      } else {
      
        setMessage(result.message || "Error issuing certificate.");
        
      }
      
    } 
    
    catch (error) {
    
      setMessage("Internal Server Error");
      
    }
    
  };


  return (
  
    <div className="bg-gray-200 py-12 min-h-screen flex flex-col items-center">
    
	      <div className="flex justify-between w-full px-8">
	      
			<p className="text-3xl font-bold text-blue-800">Certificate App</p>
			
			<div>
			
			  <Link to="/home" className="mr-6 text-xl hover:bg-red-400 hover:text-blue-900">Home</Link>
			  <Link to="/addcerti" className="text-xl hover:bg-red-400 hover:text-blue-900">Issue Certificate</Link>
			  
			</div>
		
	      </div>
      
	      <br />
	      
	      <div className="bg-cyan-50 w-6/12 shadow-lg shadow-teal-950 rounded-xl px-10 py-8">
	      
		<h3 className="text-center text-2xl font-bold">Issue New Certificate</h3>
		
		{message && <p className="text-center text-red-500 font-bold">{message}</p>}
		
		<form onSubmit={handleSubmit} className="pt-7 text-xl">
		
		  <div>
		  
		    <label className="font-bold">Select Course*</label>
		    <select value={Coursename} onChange={(e) => setCoursename(e.target.value)} className="w-full ring-2 ring-red-400">
		      <option value="Certificate Blockchain Associate">Certificate Blockchain Associate</option>
		      <option value="Certified Cybersecurity Associate">Certified Cybersecurity Associate</option>
		    </select>
		    
		  </div>
		  
		  <br />
		  
		  <div>
		  
		    <label className="font-bold">Certificate ID*</label>
		    <input type="text" value={Courseid} onChange={(e) => setCourseid(e.target.value)} className="w-full ring-2 ring-red-400" required />
		    
		  </div>
		  
		  <br />
		  
		  <div>
		  
		    <label className="font-bold">Candidate Name*</label>
		    <input type="text" value={Candidatename} onChange={(e) => setCandidatename(e.target.value)} className="w-full ring-2 ring-red-400" required />
		    
		  </div>
		  
		  <br />
		  
		  <div>
		  
		    <label className="font-bold">Select Grade*</label>
		    <select value={Grade} onChange={(e) => setGrade(e.target.value)} className="w-full ring-2 ring-red-400">
		      <option value="S">S</option>
		      <option value="A">A</option>
		      <option value="B">B</option>
		    </select>
		    
		  </div>
		  
		  <br />
		  
		  <div>
		  
		    <label className="font-bold">Description</label>
		    <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} className="w-full ring-2 ring-red-400" required />
		    
		  </div>
		  
		  <br />

		  <br />
		  
		  <div>
		  
		    <label className="font-bold">Date*</label>
		    <input type="text" value={Date} onChange={(e) => setDate(e.target.value)} className="w-full ring-2 ring-red-400" required />
		    
		  </div>
		  
		  <br />
		  
		  <div className="text-center">
		  
		    <button type="submit" className="bg-sky-700 text-white w-44 h-8 rounded-xl mt-4 hover:bg-red-400 hover:text-blue-900 font-bold">
		      Issue Certificate
		    </button>
		    
		  </div>
		  
		</form>
		
	      </div>
      
    </div>
    
  );
};

export default IssueCertificate;