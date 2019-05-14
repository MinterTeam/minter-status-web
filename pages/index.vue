<script>
    import PageMixin from '~/components/PageMixin';
    import Stats from '~/components/Stats';
    import {MAINNET} from "~/assets/variables";

    export default {
        components: {
            Stats,
        },
        mixins: [
            PageMixin,
        ],
        head() {
            const description = 'Get the status of the Minter network (block time, TPS, TX fees, etc.)';

            return {
                meta: [
                    { hid: 'description', name: 'description', content: description },
                    { hid: 'og-description', name: 'og:description', content: description },
                ],
            };
        },
        data() {
            return {
            };
        },
        beforeCreate() {
            this.$store.commit('SET_NETWORK', MAINNET);
        },
    };
</script>

<template>
    <Stats :stats="statsData" :network="$store.state.network" v-if="statsData"/>
    <h1 class="u-text-center" style="margin-top: 50px" v-else-if="!isDataLoading">Mainnet status is not available</h1>
</template>
