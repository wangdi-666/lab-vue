export default {
    state: {
        token: '',
        user: null
    },
    mutations: {
        set_token (state, token) {//设置登录token
            state.token = token || "";
        },
        set_user(state,user){//保存用户信息
            state.user = user || "";
        },
    },
    actions: {},
    getters: {}
}