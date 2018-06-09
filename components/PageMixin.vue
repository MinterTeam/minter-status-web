<script>
    import {getStatus} from "~/api";
    import {getNetworkType} from "~/assets/utils";

    let timer = null;

    export default {
        asyncData ({ route }) {
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
            }
        },
        beforeMount() {
            if (this.isDataLoading) {
                this.updateData();
            } else {
                this.handleData();
            }
        },
        destroyed() {
            clearTimeout(timer);
        },
        methods: {
            updateData() {
                getStatus(getNetworkType(this.$route))
                    .then((statsData) => {
                        this.statsData = statsData;
                        this.handleData();
                    })
                    .catch(this.handleData);
            },
            handleData() {
                this.isDataLoading = false;
                timer = setTimeout(this.updateData, 5000);
            },
        }
    }
</script>
