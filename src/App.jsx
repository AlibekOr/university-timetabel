import React from 'react'
import Kurs from './components/kurs/Kurs'
import Fakultet from './components/fakultet/Fakultet'
import { Route, Routes } from "react-router-dom"
import Gruppalar from './components/gruppalar/Gruppalar'
import Raspiysene from "./components/raspiysene/Raspiysene"
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import SerchM from './components/mugallimler/SerchM'
import ErrorPages from './components/error/ErrorPages'


const App = () => {
  return (
    <div className='bac'>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Fakultet />} />
          <Route path='/faculty:id/curses' element={< Kurs />} />
          <Route path='/faculty:id/curses:getid/grup' element={< Gruppalar />} />
          <Route path='/faculty:id/curses:getid/grup:resID/timetable' element={<  Raspiysene />} />
          <Route path='/timetable_:MgId/get' element={<  SerchM />} />
          <Route path='*' element={<  ErrorPages />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App