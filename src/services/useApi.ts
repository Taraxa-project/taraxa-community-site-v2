import axios from 'axios'

export const useApi = () => {
  const post = async (url: string, data: {}) => {
    return axios
      .post(`${process.env.REACT_APP_API_HOST}${url}`, data)
      .then((response) => {
        return {
          success: true,
          response: response.data,
        }
      })
      .catch((err) => {
        return {
          success: false,
          response: err.response.data.data,
        }
      })
  }

  const get = async (url: string) => {
    return axios
      .get(`${process.env.REACT_APP_API_HOST}${url}`)
      .then((response) => {
        return {
          success: true,
          response: response.data,
        }
      })
      .catch((err) => {
        return {
          success: false,
          response: err.response.data.data,
        }
      })
  }

  return { post, get }
}
