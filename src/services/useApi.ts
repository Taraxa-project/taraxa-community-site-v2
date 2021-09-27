import axios, { AxiosError } from 'axios'

export const useApi = () => {
  const getOptions = (includeToken: boolean = false) => {
    let options = {}

    if (includeToken) {
      const token = localStorage.getItem('auth')

      if (token !== null) {
        options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      }
    }

    return options
  }

  const getErrorResponse = (err: AxiosError) => {
    if (!err.response) {
      return {
        success: false,
        response: err.toString(),
      }
    }

    const data = err.response.data
    const response = data.data ?? data
    const message = response.message ?? response
    return {
      success: false,
      response: message,
    }
  }

  const post = async (url: string, data: {}, includeToken: boolean = false) => {
    const options = getOptions(includeToken)
    return axios
      .post(`${process.env.REACT_APP_API_HOST}${url}`, data, options)
      .then((response) => {
        return {
          success: true,
          response: response.data,
        }
      })
      .catch((err) => getErrorResponse(err))
  }

  const get = async (url: string, includeToken: boolean = false) => {
    const options = getOptions(includeToken)
    return axios
      .get(`${process.env.REACT_APP_API_HOST}${url}`, options)
      .then((response) => {
        return {
          success: true,
          response: response.data,
        }
      })
      .catch((err) => getErrorResponse(err))
  }

  return { post, get }
}
