import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout.tsx'
import AdminDashboard from './page/AdminDashboard.tsx'
import { Suspense } from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="text-white text-center p-8">Loading Your ETH Miner...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)