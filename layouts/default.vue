<script>
    import HeaderMenu from '~/components/HeaderMenu';
    import Footer from '~/layouts/_footer.vue';

    export default {
        components: {
            HeaderMenu,
            Footer,
        },
        computed: {
        },
    };
</script>

<template>
    <div class="main-wrap">
        <header class="header">
            <div class="header__container u-container">
                <div class="header__logo no-link">
                    <img class="header__logo-image" src="/img/minter-logo-circle.svg" alt="Minter" width="36" height="36">
                    <div class="header__logo-text">Status</div>
                </div>
                <HeaderMenu class="u-hidden-small-down"/>
            </div>
        </header>
        <HeaderMenu class="u-hidden-small-up"/>

        <main class="main-content u-container">
            <nuxt/>
        </main>

        <Footer/>
    </div>
</template>

