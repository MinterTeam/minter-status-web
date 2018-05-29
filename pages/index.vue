<script>
    import {getStatus} from "~/api";
    import {thousandsFilter, roundMoney} from "~/assets/utils";
    import {COIN_NAME} from "~/assets/variables";

    export default {
        filters: {
            thousands: thousandsFilter,
            number: (value) => roundMoney(value),
        },
        asyncData () {
            return getStatus()
                .then((statsData) => ({statsData}))
        },
        computed: {
            stats() {
                return {
                    ...this.statsData,
                }
            },
            coinName() {
                return COIN_NAME;
            },
        },
        created() {
            this.handleData();
        },
        methods: {
            updateData() {
                getStatus()
                    .then((statsData) => {
                        this.statsData = statsData;
                        this.handleData();
                    })
                    .catch(this.handleData);
            },
            handleData() {
                setTimeout(this.updateData, 5000);
            },
        }
    }
</script>

<template>
    <div class="u-grid u-grid--vertical-margin">
        <section class="u-cell u-cell--medium--1-2">
            <div class="index-stats panel panel__section">
                <div class="u-grid u-grid--vertical-margin">
                    <div class="u-cell u-cell--1-2">
                        <div class="index-stats__name">Status</div>
                        <div class="index-stats__value index-stats__value--primary" :class="stats.status === 'active' ? 'index-stats__green' : 'index-stats__red'">
                            {{ stats.status }}
                        </div>
                    </div>
                    <div class="u-cell u-cell--1-2">
                        <div class="index-stats__name">Uptime</div>
                        <div class="index-stats__value index-stats__value--primary">{{ stats.uptime }}%</div>
                    </div>
                </div>
            </div>
        </section>
        <div class="u-cell u-cell--medium--1-2 u-hidden-medium-down"></div>
        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-block.svg" width="40" height="40" alt="" role="presentation">
                        Blocks
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Number of blocks</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.numberOfBlocks | thousands }}</div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Speed of blocks (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.blockSpeed24h | number }}s</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-transaction.svg" width="40" height="40" alt="" role="presentation">
                        Transactions
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name"># of transactions (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.txTotalCount }}</div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name"># per second (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.txPerSecond | number }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-validator.svg" width="40" height="40" alt="" role="presentation">
                        Validators
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Active validators</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.activeValidators }}</div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Total # of validators</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.totalValidatorsCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-commission.svg" width="40" height="40" alt="" role="presentation">
                        Commission
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Average per transaction (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">
                                <span class="index-stats__value-text">{{ stats.averageTxCommission }}</span>
                                <span class="index-stats__sub-value">{{ coinName }}</span>
                            </div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Total commission</div>
                            <div class="index-stats__value index-stats__value--primary">
                                <span class="index-stats__value-text">{{ stats.totalCommission }}</span>
                                <span class="index-stats__sub-value">{{ coinName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
