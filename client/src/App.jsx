import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import './assets/sass/main.scss'


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </ Routes>
  )
}
