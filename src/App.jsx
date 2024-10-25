import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Overview from './pages/Overview/Overview'
import Profile from './pages/Profile/Profile'
import AssessmentAnalytics from './pages/AssessmentAnalytics/AssessmentAnalytics'
import DealerPerformance from './pages/DealerPerformance/DealerPerformance'
import QuestionAnalytics from './pages/QuestionAnalytics/QuestionAnalytics'
import CategoryWiseReport from './pages/CategoryWiseReport/CategoryWiseReport'
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword'
import UserPerformance from './pages/UserPerformance/UserPerformance'

function App() {


  return (
    <>
    <Routes>
      <Route element={<Login />} path='/login'/>
      <Route element={<ResetPassword />} path='/resetPassword'/>
      <Route element={<Overview />} path='/overview'/>
      <Route element={<Profile />} path='/profile'/>
      <Route element={<AssessmentAnalytics />} path='/assessmentAnalytics'/>
      <Route element={<DealerPerformance />} path='/dealerPerformance'/>
      <Route element={<QuestionAnalytics />} path='/questionAnalytics'/>
      <Route element={<CategoryWiseReport />} path='/categoryWiseReport'/>
      <Route element={<UserPerformance />} path='/userPerformance'/>
    </Routes>
    </>
  )
}

export default App