<script>
    import {getStatus} from "~/api";
    import {getNetworkType} from "~/assets/utils";

    let timer = null;

    export default {
        asyncData ({ route }) {
            return getStatus(getNetworkType(route))
                .then((statsData) => ({statsData}))
                .catch((e) => {})
        },
        data() {
            return {
                statsData: null,
            }
        },
        created() {
            this.handleData();
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
                timer = setTimeout(this.updateData, 5000);
            },
        }
    }
</script>
