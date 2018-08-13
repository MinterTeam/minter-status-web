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
        head() {
            const title = 'Minter Testnet Status';

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                ],
            }
        },
        data() {
            return {
                network: TESTNET,
            }
        }
    }
</script>

<template>
    <Stats :stats="statsData" :network="network" v-if="statsData"/>
    <h1 class="u-text-center" style="margin-top: 50px" v-else-if="!isDataLoading">Testnet Explorer is not available</h1>
</template>
