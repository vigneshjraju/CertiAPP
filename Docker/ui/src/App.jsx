import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'; 

import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import IssueCertificate from './pages/Addcerti.jsx';
import HomePage from './pages/Home.jsx';
import ViewCertificate from './pages/Viewcertificate.jsx';
import EditCertificate from './pages/Edit.jsx';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>

          <Route path='/' element={<Navigate to="/signup"/>}/>
     
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/addcerti' element={<IssueCertificate/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path="/viewcertificate/:certificateId" element={<ViewCertificate />} />
          <Route path="/certificate/:certiid" element={<EditCertificate />} />

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
