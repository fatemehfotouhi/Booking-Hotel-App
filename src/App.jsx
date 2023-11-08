import React from 'react';
import Header from './components/Header/Header';
import LocationList from './components/LocationList/LocationList';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
      <Toaster />
      <Header />
      <LocationList />
    </div>
  )
}

export default App