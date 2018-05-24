<script>
    import {getStatus} from "~/api";
    import Stats from "~/components/Stats";

    export default {
        components: {
            Stats,
        },
        asyncData () {
            return getStatus()
                .then((stats) => ({stats}))
        },
    }
</script>

<template>
    <Stats stats-type="testnet" :stats-data="stats"/>
</template>
