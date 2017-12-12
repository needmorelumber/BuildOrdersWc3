import axios from 'axios';

export default {
  all_builds: () => {
    return axios.get(`/api/all_builds`)
      .then(res => {
        return {
          data: res.data
        }
      })
  },
  new_build: (newBuild) => {
    return axios.post(`/api/new_build`, newBuild)
      .then(res => {
        return {
          data: res.data
        }
      })
  },
  updateBuildorder: (newBuildOrder, id) => {
    const newOrder = {timeline: newBuildOrder, id: id};
    return axios.post(`api/update_build`, newOrder)
      .then(res => {
        return {
          data: res.data
        }
      })
  },
  getById: (id) => {
    return axios.post(`api/get_by_id`, id) 
      .then(res => {
        return {
          data: res.data
        }
      })
  }
}
