<script>
    import SockJS from "sockjs-client";
    import Centrifuge from 'centrifuge';
    import {getStatus, getWebSocketConnectData} from "~/api";
    import {getNetworkType} from "~/assets/utils";
    import {EXPLORER_RTM_URL, NETWORK_EXPLORER_CHANNEL} from "~/assets/variables";

    let centrifuge;
    const NETWORK_WS_PREFIX = NETWORK_EXPLORER_CHANNEL ? NETWORK_EXPLORER_CHANNEL + '_' : '';

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
                // console.log(centrifuge._transport)
                // console.log(centrifuge._transport.close)
                // console.log(centrifuge._transport.websocket.close)
                // centrifuge._transport.onclose = (e) => console.log(e)

                try {
                    centrifuge.disconnect();
                } catch (e) {
                    console.log(e);
                    // fix centrifuge incorrect closing
                    if (!centrifuge._transport.close && !centrifuge._transportClosed) {
                        centrifuge._transport.websocket.close();
                    }
                }
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
                window.cent = centrifuge;

                let callbacks = {
                    message: (data) => this.statsData = data.data,
                    join: (message) => {},
                    leave: (message) => console.log(message),
                    subscribe: (context) => {},
                    error: (errContext) => console.log(errContext),
                    unsubscribe: (context) => console.log(context),
                };
                centrifuge.subscribe(NETWORK_WS_PREFIX + "status_page", callbacks);
                centrifuge.connect();
            },
        },
    };
</script>
