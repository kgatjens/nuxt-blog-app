import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state:{
            posts:[],
            loading: false,
        },
        mutations:{
            
            setPosts(state,posts){
                state.posts = posts;
            },
            setLoading(state, loading) {
                state.loading = loading;
            }
        },
        actions:{
            async loadPosts({commit},apiUrl){
                // console.log("==========");
                // console.log(apiUrl);
                commit('setLoading', true);

                const  blogPosts  = await this.$axios.$get(apiUrl);
                // console.log("==========");
                // console.log(this.$axios.$get(apiUrl));
                commit('setLoading', false);

                commit("setPosts", blogPosts);
            },
            async authenticateUser({commit}, userPayload){
                try{
                    console.log("********1");

                    const authUserData = await this.$axios.$post('/register/',userPayload);
                    console.log(authUserData);
                    console.log("********2");

                    commit('setLoading', true);
                    console.log(userPayload);
                    console.log(this.$axios.$post);
                    console.log("********333 ");
                   // const authUserData1 = await this.$axios.$post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq-vskpwqYy8OhLY4DHsH-dLICj5OW9go',userPayload);
                    console.log(authUserData);
                    console.log("********3");

                    console.log(authUserData);
                    commit('setLoading', false);
                }catch(err){
                    console.log("********4");

                   // console.error(err);
                    commit('setLoading', false);
                }
            }
        },
        getters:{   
            posts: state => state.posts,
            loading: state => state.loading
        }
    });
};

export default createStore;