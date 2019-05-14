export default {
    SET_NETWORK: (state, network) => {
        state.network = network;
    },
    PUSH_HISTORY: (state, historyItem) => {
        state.history.push(historyItem);
    },
    POP_HISTORY: (state) => {
        state.history.pop();
    },
};
