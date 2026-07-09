import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  withCredentials: true,
});

export async function UserRegister({username, email, password}) {
  try {
    const response = await api.post('/user/register',{
    username,
    email,
    password
  })

  return response

  } catch (error) {
    console.log(error);
    throw error
    
  }
}
export async function UserLogout() {
  try {
    const response = await api.get('/user/logout')
  return response
  } catch (error) {
    console.log(error)
  }
}

export async function UserLogoutAll(){
  try {
    const response = await api.get('/user/logoutAll')
  return response
}
   catch (error) {
    console.log(error)
  }
}

export async function UserLogin({email, password}) {
  try {
    const response = await api.post('/user/login',{
      email,
      password
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function VerifyEmail ({email, otp}) {
  try {
    const response = await api.post('/user/verifyEmail',{
      email,
      otp
    })

    return response
  } catch (error) {
    console.log(error);
    throw error
    
  }
}

export async function foodpartnerLogin({email, password}) {
  try {
    const response = await api.post('/foodPartner/login',{
      email,
      password
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function foodpartnerRegister({name, email, password}) {
  try {
    const response = await api.post('/foodPartner/register',{
      name,
      email,
      password
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function foodPartnerLogout() {
try {
  const response = await api.get('/foodPartner/logout')
  return response
} catch (error) {
  console.log(error)}
}

