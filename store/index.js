import Vuex from 'vuex';

//import actions from './actions'
import mutations from './mutations';
//import getters from './getters'

export default function createStore() {
    return new Vuex.Store({
        state: {
            network: '',
            history: [],
        },
        //actions,
        mutations,
        //getters,
    });
}
