import axios from "axios";
const baseUrl = '//localhost:3500/api/'

const getTrending = async () => {
  const response = await axios.get(baseUrl + 'trending/movies')
  
  return response.data
}

export default getTrending