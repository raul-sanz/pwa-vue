import axios from 'axios'

export default ({ Vue }) => {
  let baseURL =  'https://tweetr-api-adonis.herokuapp.com'
  

  Vue.prototype.$axios = axios.create({
    baseURL
  })
}