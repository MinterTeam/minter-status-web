<script>
    // import SockJS from "sockjs-client";
    import Centrifuge from 'centrifuge';
    import {getStatus} from "~/api";
    import {getNetworkType} from "~/assets/utils";
    import {EXPLORER_RTM_URL, MAINNET, TESTNET, NETWORK_MAINNET_CHANNEL, NETWORK_TESTNET_CHANNEL} from "~/assets/variables";

    let centrifuge;

    export default {
        asyncData({route}) {
            if (process.server) {
                return;
            }
            return getStatus(getNetworkType(route))
                .then((statsData) => ({
                    statsData,
                    isDataLoading: false,
                }))
                .catch((e) => {});
        },
        data() {
            return {
                isDataLoading: true,
                statsData: null,
            };
        },
        computed: {
            wsChannelPrefix() {
                const channel = this.network === MAINNET ? NETWORK_MAINNET_CHANNEL : NETWORK_TESTNET_CHANNEL;
                return channel ? channel + '_' : '';
            },
        },
        beforeMount() {
            if (this.isDataLoading) {
                getStatus(getNetworkType(this.$route))
                    .then((statsData) => {
                        this.statsData = statsData;
                        this.isDataLoading = false;
                    })
                    .catch((e) => {
                        this.isDataLoading = false;
                    });
            }
            // getWebSocketConnectData(getNetworkType(this.$route))
            //     .then((data) => this.subscribeWS(data));
            this.subscribeWS();
        },
        destroyed() {
            if (centrifuge) {
                centrifuge.disconnect();
            }
        },
        methods: {
            subscribeWS(connectData) {
                centrifuge = new Centrifuge(EXPLORER_RTM_URL, {
                    // user: connectData.user ? connectData.user : '',
                    // timestamp: connectData.timestamp.toString(),
                    // token: connectData.token,
                    // sockjs: SockJS,
                });

                // let callbacks = {
                //     message: (data) => this.statsData = data.data,
                //     join: (message) => {},
                //     leave: (message) => console.log(message),
                //     subscribe: (context) => {},
                //     error: (errContext) => console.log(errContext),
                //     unsubscribe: (context) => console.log(context),
                // };
                //@TODO subscribe to blocks, status_page ws does not work
                centrifuge.subscribe(this.wsChannelPrefix + "status_page", (statusData) => {
                    this.statsData = statusData.data;
                });
                centrifuge.connect();
            },
        },
    };
</script>
