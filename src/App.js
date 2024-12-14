import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Newss from "./Components/Newss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
  
  const[progress,setProgress] = useState(0);
  
  
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
          height={3}
        color='#f11946'
        progress={progress}
        
      />
          <Routes>
            <Route
              path="/"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="general" pageSize={15} country="us" category="general" />}
            />
            <Route
              path="/business"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="business" pageSize={15} country="us" category="business" />}
            />
            <Route
              path="/entertainment"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="entertainment" pageSize={15} country="us" category="entertainment" />}
            />
            <Route
              path="/health"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="health" pageSize={15} country="us" category="health" />}
            />
            <Route
              path="/science"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="science" pageSize={15} country="us" category="science" />}
            />
            <Route
              path="/sports"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="sports" pageSize={15} country="us" category="sports" />}
            />
            <Route
              path="/technology"
              element={<Newss setProgress = {setProgress} apiKey = {apiKey} key="technology" pageSize={15} country="us" category="technology" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
  export default App

