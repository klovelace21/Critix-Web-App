import axios from "axios";
const baseUrl = '//localhost:3500/api/'

const getTrending = async param => {
  const response = await axios.get(
    baseUrl + 'trending/movies',
   { params: {
    param: param,
   },
  })
  
  return response.data
}

export default getTrending