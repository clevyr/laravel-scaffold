<template>
    <b-navbar toggleable="lg" v-if="!$route.meta.hideNav">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                Vue
            </router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto" v-if="isAuth">
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item-dropdown :text="user && user.name" right>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto" v-else>
                    <b-nav-item to="/login">Login</b-nav-item>
                    <b-nav-item to="/register">Register</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex';
import { STATE_SUCCESS } from '../constants/requestStates';

export default {
    computed: {
        ...mapState('auth', [
            'isAuth',
            'user',
        ]),
    },

    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout/sendRequest');

            if (this.$store.state.auth.logout.requestState === STATE_SUCCESS) {
                this.$store.dispatch('toast/addTimedToast', {
                    type: 'primary',
                    message: 'Logged out successfully',
                });
                this.$router.push('/login');
            }
        },
    }
}
</script>
