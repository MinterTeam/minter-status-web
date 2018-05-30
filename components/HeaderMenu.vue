<script>
    import {MAINNET, MAINNET_STATUS_URL, TESTNET_STATUS_URL} from "~/assets/variables";
    import {getNetworkType} from "~/assets/utils";

    export default {
        computed: {
            isMain() {
                return getNetworkType(this.$route) === MAINNET;
            },
            mainnetUrl() {
                return this.isMain ? false : MAINNET_STATUS_URL;
            },
            testnetUrl() {
                return !this.isMain ? false : TESTNET_STATUS_URL;
            }
        }
    }
</script>

<template>
    <div class="header__menu">
        <nuxt-link class="header__link" to="/">Mainnet</nuxt-link>
        <nuxt-link class="header__link" to="/testnet">Testnet</nuxt-link>
    </div>
</template>
