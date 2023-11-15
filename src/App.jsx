import React from 'react';
import LocationList from './components/LocationList/LocationList';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AppLayout from './components/AppLayout/AppLayout';
import Hotels from './components/Hotels/Hotels';
import HotelsProvider from './components/context/HotelsProvider';
import SingleHotel from './components/SingleHotel/SingleHotel';


function App() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
      <Toaster />
      <HotelsProvider>
        <Header />
        <Routes>
          <Route path='/' element={<LocationList />} />
          <Route path='/hotels' element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=':id' element={<SingleHotel />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </div>
  )
}

export default App