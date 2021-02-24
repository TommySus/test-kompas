import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataJajan: []
  },
  mutations: {
    getAllData (state, payload) {
      state.dataJajan = payload
    }
  },
  actions: {
    fetchData (context) {
      axios({
        method: 'GET',
        url: '/items'
      })
        .then(({ data }) => {
          context.commit('getAllData', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addData (context, payload) {
      return axios({
        method: 'POST',
        url: '/items',
        data: {
          name: payload.name,
          cost: payload.cost,
          created_at: payload.created_at
        }
      })
    }
  },
  modules: {
  }
})
