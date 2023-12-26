// Sample authentication functions using localStorage

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  export const login = async (email, password) => {
    // Simulate login, replace with actual authentication API call
    if (email === 'surajchakraborty82@gmail.com' && password === 'Suraj@101998') {
      localStorage.setItem('token', 'fakeToken');
    } else {
      throw new Error('Invalid credentials');
    }
  };
  
  export const register = async (email, password) => {
    // Simulate registration, replace with actual registration API call
    // You might want to handle registration validation and error handling here
    localStorage.setItem('token', 'fakeToken');
  };
  