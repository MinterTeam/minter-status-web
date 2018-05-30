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
                .then((statsData) => ({statsData}))
                .catch((e) => {})
        },
        data() {
            return {
                isStatsLoading: true,
                statsData: null,
            }
        },
        created() {
            if (this.statsData) {
                this.handleData();
            } else {
                this.updateData();
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
                this.isStatsLoading = false;
                timer = setTimeout(this.updateData, 5000);
            },
        }
    }
</script>
