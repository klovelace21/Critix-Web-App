import axios from "axios";
const baseUrl = '//localhost:3500/users'

const createUser = async newUser => {
  
  const response = await axios.post(baseUrl, newUser)

  return response.data
}



export default createUser