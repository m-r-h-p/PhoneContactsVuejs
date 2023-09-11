import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getId, setId } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const state = {
  token: getToken(),
  id: getId(),
  name: '',
  avatar: '',
  introduction: '',
  roles: ['admin', 'super']
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email, password: password }).then(response => {
        console.log(response.meta.message)
        if (response.meta.message === 'UserIsNotActive') {
          alert('please ACtive your accunts')
        }
        // const { data } = response
        commit('SET_ID', response.data.values.id)

        // console.log(this.state.id)
        // commit('SET_ID', response.data.values.id)
        commit('SET_TOKEN', 'admin-token')
        const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        commit('SET_AVATAR', avatar)
        setId(response.data.values.id)
        // var id = response.data.values.id
        setToken('123456')
        resolve()
      }).catch(error => {
        reject(error)
      }

      )
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const user = response.data.values
        // console.log(user)
        // console.log(response.data.values.id)

        setId(response.data.values.id)

        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }
        // console.log(response)
        // console.log()
        const roles = ['admin', 'super-admin']

        // console.log(this.state)

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        console.log(response.data.values.id)
        user.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

        commit('SET_ROLES', roles)
        commit('SET_NAME', user.name)
        commit('SET_AVATAR', user.avatar)
        commit('SET_INTRODUCTION', 'keraseh.com')
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({ commit, state, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       removeToken()
  //       resetRouter()

  //       // reset visited views and cached views
  //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //       dispatch('tagsView/delAllViews', null, { root: true })

  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
