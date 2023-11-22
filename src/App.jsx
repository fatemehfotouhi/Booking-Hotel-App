import React from 'react';
import LocationList from './components/LocationList/LocationList';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AppLayout from './components/AppLayout/AppLayout';
import Hotels from './components/Hotels/Hotels';
import HotelsProvider from './components/context/HotelsProvider';
import SingleHotel from './components/SingleHotel/SingleHotel';
import BookmarkLayout from './components/BookmarkLayout/BookmarkLayout';
import AddNewBookmark from './components/AddNewBookmark/AddNewBookmark';
import BookmarksList from './components/BookmarksList/BookmarksList';
import BookmarkProvider from './components/context/BookmarkProvider';
import SingleBookmark from './components/SingleBookmark.jsx/SingleBookmark';
import Login from './components/Login/Login';
import AuthProvider from './components/context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
      <HotelsProvider>
        <BookmarkProvider>
          <AuthProvider>
            <Toaster />
            <Header />
            <Routes>
              <Route path='/' element={<LocationList />} />
              <Route path='/login' element={<Login />} />
              <Route path='/hotels' element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=':id' element={<SingleHotel />} />
              </Route>
              <Route path='/bookmarks' element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              } >
                <Route index element={<BookmarksList />}></Route>
                <Route path=':id' element={<SingleBookmark />}></Route>
                <Route path='add' element={<AddNewBookmark />}></Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BookmarkProvider>
      </HotelsProvider>
    </div>
  )
}

export default App