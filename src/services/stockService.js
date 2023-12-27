// Sample service to fetch real-time stock data

const API_KEY = 'YOUR_IEX_CLOUD_API_KEY';
const BASE_URL = 'https://cloud.iexapis.com/stable';

export const fetchRealTimeData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stock/market/list/mostactive?token=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    throw new Error('Error fetching real-time data');
  }
};
