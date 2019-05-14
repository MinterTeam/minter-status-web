<script>
    // import SockJS from "sockjs-client";
    import Centrifuge from 'centrifuge';
    import {getStatus} from "~/api";
    import {getNetworkType} from "~/assets/utils";
    import {EXPLORER_MAINNET_RTM_URL, EXPLORER_TESTNET_RTM_URL, MAINNET, TESTNET} from "~/assets/variables";

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
        },
        beforeMount() {
            if (this.isDataLoading) {
                getStatus(this.$store.state.network)
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
                centrifuge = new Centrifuge(this.$store.state.network === MAINNET ? EXPLORER_MAINNET_RTM_URL : EXPLORER_TESTNET_RTM_URL, {
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
                centrifuge.subscribe("status_page", (statusData) => {
                    this.statsData = statusData.data;
                });
                centrifuge.connect();
            },
        },
    };
</script>
