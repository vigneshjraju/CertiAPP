import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { certi } from "../../images/images.jsx";

const HomePage = () => {

  const [certificateId, setCertificateId] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {

    if (certificateId) {
      navigate(`/viewcertificate/${certificateId}`);

    }

  };

  return (

    <div className="bg-gray-200 h-screen py-12 flex flex-col items-center">

      <div className="flex justify-end w-full px-8">

            <Link to="/home" className="mr-6 text-xl hover:bg-red-400 hover:text-blue-900">Home</Link>
            <Link to="/addcerti" className="text-xl hover:bg-red-400 hover:text-blue-900">Issue Certificate</Link>
      
      </div>


      <h1 className="text-3xl mb-5 text-center">Certificate Dapp</h1>

      <p className="flex justify-center">
        <img src={certi} alt="Certificate" className="shadow-lg shadow-teal-950 w-76" />
      </p>

      <br />

      <div className="text-center">

            <input
            type="text"
            placeholder="Enter Certificate ID to view"
            className="ring-2 ring-red-400 p-2"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            required
            />
            
            <button
            onClick={handleSearch}
            className="bg-sky-700 ring-2 ring-red-400 text-white w-24 ml-2 hover:bg-red-400 hover:text-blue-900 p-2"
            >
            Search
            </button>

      </div>

    </div>

  );
};

export default HomePage;
