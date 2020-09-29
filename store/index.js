import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state:{
            posts:[]
        },
        mutations:{
            
            setPosts(state,posts){
                state.posts = posts;
                
            }
        },
        actions:{
            async loadPosts({commit},apiUrl){
             
            const  blogPosts  = await this.$axios.$get(apiUrl);
                    
            commit("setPosts", blogPosts);
            }
        },
        getters:{   
            posts: state => state.posts    
        }
    });
};

export default createStore;