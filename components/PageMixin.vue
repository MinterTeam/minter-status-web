<script>
    import {getStatus, getWebSocketConnectData} from "~/api";
    import {getNetworkType} from "~/assets/utils";
    import SockJS from "sockjs-client";
    import Centrifuge from 'centrifuge';
    import {EXPLORER_RTM_URL} from "~/assets/variables";

    let centrifuge;

    export default {
        asyncData({route}) {
            if (process.server) {
                return;
            }
            return getStatus(getNetworkType(route))
                .then((statsData) => ({
                    statsData,
                }))
                .catch((e) => {});
        },
        data() {
            return {
                statsData: null,
            };
        },
        beforeMount() {
            getWebSocketConnectData(getNetworkType(this.$route))
                .then((data) => this.subscribeWS(data));
        },
        destroyed() {
            centrifuge.disconnect();
        },
        methods: {
            subscribeWS(connectData) {
                centrifuge = new Centrifuge({
                    url: EXPLORER_RTM_URL,
                    user: connectData.user ? connectData.user : '',
                    timestamp: connectData.timestamp.toString(),
                    token: connectData.token,
                    sockjs: SockJS,
                });

                let callbacks = {
                    message: (data) => this.statsData = data.data,
                    join: (message) => {},
                    leave: (message) => console.log(message),
                    subscribe: (context) => {},
                    error: (errContext) => console.log(errContext),
                    unsubscribe: (context) => console.log(context),
                };
                centrifuge.subscribe("status_page", callbacks);
                centrifuge.connect();
            },
        },
    };
</script>
