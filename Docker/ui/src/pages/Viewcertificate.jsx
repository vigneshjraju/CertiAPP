import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { certi } from "../../images/images.jsx";
import { Link } from "react-router-dom";

const ViewCertificate = () => {

  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const fetchCertificate = async () => {
    
      try {
        const response = await fetch(`/api/certificate/${certificateId}`, {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });
        

        if (!response.ok) {
          throw new Error("Certificate not found");
        }
        

        const data = await response.json();
        setCertificate(data.certificate);
        
      } 
      
      catch (err) {
        setError(err.message);
      }
      
    };
    

    fetchCertificate();
    
  }, [certificateId]);
  

  return (
  
    <div className="bg-gray-200 w-full h-screen  justify-items-center py-12">
    
      <div className="bg-cyan-50 w-6/12 border-2 border-orange-600 rounded-lg shadow-lg shadow-teal-950 p-10 text-center">
      
        {error ? (
        
          <p className="text-red-500 text-2xl font-bold">{error}</p>
        ) : certificate ? (
        
          <>
            <h2 className="text-3xl font-bold mb-5">Kerala Blockchain Academy</h2>
            
            <div className="flex justify-center">
            
              <img
                src={certi}
                alt="Blockchain Certificate"
                className="shadow-lg shadow-teal-950 w-76"
              />
              
            </div>
            
            <br />
            
            <p className="text-2xl">
            
              This is to certify that <b>{certificate.CANDIDATENAME}</b> <br />
              
              has successfully completed <b>{certificate.COURSENAME}</b> <br />
              
              with <b>{certificate.GRADE}</b> on <b>{certificate.DATE}</b>
              
            </p>
            
          </>
        ) : (
          <p className="text-xl">Loading certificate details...</p>
        )}
        
      </div>
	  
	  <br />
	  <br />

	  {certificate && certificate.COURSEID && (

		<Link to={`/certificate/${certificate.COURSEID}`}>
			<button className="bg-blue-800 w-28 h-12 text-amber-50 hover:bg-blue-600">Edit</button>
		</Link>
		
		)}
	  	
      
    </div>
    
  );
};

export default ViewCertificate;
