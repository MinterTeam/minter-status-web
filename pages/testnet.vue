<script>
    import PageMixin from '~/components/PageMixin';
    import Stats from '~/components/Stats';
    import {TESTNET, BASE_TITLE} from "~/assets/variables";

    export default {
        components: {
            Stats,
        },
        mixins: [
            PageMixin,
        ],
        head() {
            const title = 'Testnet ' + BASE_TITLE;
            const description = 'Get the status of the Minter test network (block time, TPS, TX fees, etc.)';

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                    { hid: 'description', name: 'description', content: description },
                    { hid: 'og-description', name: 'og:description', content: description },
                ],
            };
        },
        data() {
            return {
                network: TESTNET,
            };
        },
    };
</script>

<template>
    <Stats :stats="statsData" :network="network" v-if="statsData"/>
    <h1 class="u-text-center" style="margin-top: 50px" v-else-if="!isDataLoading">Testnet Explorer is not available</h1>
</template>
