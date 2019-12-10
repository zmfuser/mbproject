import { login, logout, getInfo } from '@/api/login'
import { generateRoutes } from '@/router/makeRoute'
import { isEmpty } from "../../utils";

const user = {
  state: {
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    route: [],
    dataUser: ''
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_DATAUSER: (state, user) => {
      state.dataUser = user
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.rememberMe, userInfo.code).then(response => {
          if (response.code != 0) {
            reject()
          } else {
            resolve()
            
            sessionStorage.setItem("listcode", response.code)
            //登录成功
            
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (response.code == 0) {
            // 获取用户的Ucode
            sessionStorage.setItem("getInfo", JSON.stringify(response.value))
            sessionStorage.setItem("ucode", response.value.id)
            sessionStorage.setItem("User", JSON.stringify(response.value))
            const data = response.value;
            commit('SET_PERMISSIONS', data.userMenuPermission.permissionList);
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', isEmpty(data.avatar) ? "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
              : data.avatar)
            commit('SET_DATAUSER', data);
            //生成路由
            generateRoutes(data.userMenuPermission, state);
            resolve(response)
          } else {
            reject();
          }
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          localStorage.clear()
          sessionStorage.clear()
          commit('SET_PERMISSIONS', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
