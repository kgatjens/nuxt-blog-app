import Vuex from 'vuex';
import md5 from 'md5';

export const state = () => ({
    posts:[],
    token: "",
    loading: false,
    user: null
});

export const mutations = {
    setPosts(state, posts){
        state.posts = posts;
    },
    setToken(state, token){
        state.token = token;
    },
    setUser(state, user){
        state.user = user;
    },
    setLoading(state, loading) {
        state.loading = loading;
    }
};

export const actions = {
    async loadPosts({commit},apiUrl){
        commit('setLoading', true);
        const  blogPosts  = await this.$axios.$get(apiUrl);
        commit('setLoading', false);
        commit("setPosts", blogPosts);
    },
    async authenticateUser({commit}, userPayload){
        try{
            
            commit('setLoading', true);
            const authUserData = await this.$axios.$post('/register/',userPayload);
            const avatar = 'http://gravatar.com/avatar/${hasha(authUserData.email)}?d=identicon';
            const user = {email:authUserData.email, avatar};
            commit('setUser', user);
            commit('setToken', authUserData.idToken);
            commit('setLoading', false);
        }catch(err){
            commit('setLoading', false);
        }
    }
};

export const getters = {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    authenticated: state => !!state.token
};

