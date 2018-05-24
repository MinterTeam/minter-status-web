<script>
    import thousands from 'thousands';

    export default {
        props: {
            statsType: {
                type: String,
                required: true,
            },
            statsData: {
                type: Object,
                required: true,
            },
        },
        computed: {
            stats() {
                return {
                    ...this.statsData,
                    latestBlockHeight: thousands(this.statsData.latestBlockHeight, '&thinsp;'),
                    averageBlockTime: this.statsData.averageBlockTime.toFixed(1),
                    transactionsPerSecond: this.statsData.transactionsPerSecond.toFixed(1),
                }
            }
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
                        <div class="index-stats__value index-stats__value--primary index-stats__green">Active</div>
                    </div>
                    <div class="u-cell u-cell--1-2">
                        <div class="index-stats__name">Uptime</div>
                        <div class="index-stats__value index-stats__value--primary">99.998%</div>
                    </div>
                </div>
            </div>
        </section>
        <div class="u-cell u-cell--medium--1-2 u-hidden-medium-down"></div>
        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-block.svg" alt="" role="presentation">
                        Blocks
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Number of blocks</div>
                            <div class="index-stats__value index-stats__value--primary" v-html="stats.latestBlockHeight"></div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Speed of blocks (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.averageBlockTime }}s</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-transaction.svg" alt=""
                             role="presentation">
                        Transactions
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name"># of transactions (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.totalTransactions }}</div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name"># per second (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">{{ stats.transactionsPerSecond }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-validator.svg" alt="" role="presentation">
                        Validators
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Active validators</div>
                            <div class="index-stats__value index-stats__value--primary">4304</div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Total # of validators</div>
                            <div class="index-stats__value index-stats__value--primary">64&thinsp;093</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="u-cell u-cell--medium--1-2">
            <div class="panel">
                <div class="panel__section panel__header">
                    <h2 class="panel__header-title panel__title">
                        <img class="panel__header-title-icon" src="/img/icon-commission.svg" alt="" role="presentation">
                        Commission
                    </h2>
                </div>
                <div class="panel__section">
                    <div class="u-grid u-grid--vertical-margin">
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Average per transaction (24h)</div>
                            <div class="index-stats__value index-stats__value--primary">
                                <span class="index-stats__value-text">1.314</span>
                                <span class="index-stats__sub-value">BIP</span>
                            </div>
                        </div>
                        <div class="u-cell u-cell--1-2">
                            <div class="index-stats__name">Total commission</div>
                            <div class="index-stats__value index-stats__value--primary">
                                <span class="index-stats__value-text">5&thinsp;813&thinsp;444.314</span>
                                <span class="index-stats__sub-value">BIP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
