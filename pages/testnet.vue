<script>
    import PageMixin from '~/components/PageMixin';
    import Stats from '~/components/Stats';
    import {TESTNET} from "~/assets/variables";

    export default {
        components: {
            Stats,
        },
        mixins: [
            PageMixin,
        ],
        data() {
            return {
                network: TESTNET,
            }
        }
    }
</script>

<template>
    <Stats :stats="statsData" :network="testnet" v-if="statsData"/>
    <h1 class="u-text-center" style="margin-top: 50px" v-else>Testnet is not available</h1>
</template>
