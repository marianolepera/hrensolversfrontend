import axios from 'axios'


// Register user
const register = async (userData) => {
  
  const response = await axios.post("http://localhost:4000/api/auth/signup", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post("http://localhost:4000/api/auth/login", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService