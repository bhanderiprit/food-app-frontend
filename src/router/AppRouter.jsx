import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserRegister from '../features/auth/pages/UserRegister'
import UserLogin from '../features/auth/pages/UserLogin'
import FoodPartnerRegister from '../features/auth/pages/FoodPartnerRegister'
import FoodPartnerLogin from '../features/auth/pages/FoodPartnerLogin'
import FoodCreate from '../features/auth/pages/FoodCreate'
import VerifyEmail from '../features/auth/pages/VerifyEmail'
import Feed from '../features/auth/pages/Feed'
import Profile from '../features/auth/pages/Profile'
import Save from '../features/auth/pages/Save'
import ProtectedRoute from './ProtectedRoute'
import ProtectedFoodPartnerRoute from './ProtectedFoodPartnerRoute'
import FoodPartnerProfile from '../features/auth/pages/FoodPartnerProfile';

const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/user/login" replace />} /> */}

                <Route path='/user/register' element={<UserRegister/>}/>
                <Route path='/user/login' element={<UserLogin/>}/>
                <Route path='/user/verifyEmail/:id' element={<VerifyEmail />}/>
                <Route path='/' element = {<ProtectedRoute><Feed/></ProtectedRoute>}/>
                <Route path='/save' element = {<ProtectedRoute><Save/></ProtectedRoute>}/>
                <Route path='/food-partner/register' element={<FoodPartnerRegister/>}/>
                <Route path='/food-partner/login' element={<FoodPartnerLogin/>}/>
                <Route path='/food-partner/create-food' element={<ProtectedFoodPartnerRoute><FoodCreate/></ProtectedFoodPartnerRoute>}/>
                <Route path='/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path='/food-partner-profile/:id' element={<ProtectedFoodPartnerRoute><FoodPartnerProfile/></ProtectedFoodPartnerRoute>}/>

                
                
            </Routes>
            
        </BrowserRouter>
    </div>
  )
}

export default AppRouter