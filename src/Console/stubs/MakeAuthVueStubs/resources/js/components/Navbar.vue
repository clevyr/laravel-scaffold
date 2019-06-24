<template>
    <div class="navbar navbar-expand-md navbar-light" v-if="!$route.meta.hideNavbar">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                Vue
            </router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <div class="navbar-nav ml-auto" v-if="isAuth">
                    <router-link class="nav-item nav-link" to="/home">Home</router-link>
                    <b-nav-item-dropdown right>
                        <template slot="button-content">{{ user && user.name }}</template>
                        <b-dropdown-item>Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
                <div class="navbar-nav ml-auto" v-else>
                    <router-link class="nav-item nav-link" to="/login">Log In</router-link>
                    <router-link class="nav-item nav-link" to="/register">Sign Up</router-link>
                </div>
            </b-collapse>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { STATE_SUCCESS } from '../constants/requestStates';

export default {
    computed: {
        ...mapState('auth/logout', [
            'requestState',
            'error',
        ]),
        ...mapState('auth', [
            'isAuth',
            'user',
        ]),
    },

    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout/sendRequest');

            if (this.requestState === STATE_SUCCESS) {
                this.$bvToast.toast('Logged out successfully', {
                    title: 'Success',
                    toaster: 'b-toaster-bottom-right',
                    variant: 'primary',
                    autoHideDelay: 5000,
                    solid: true,
                    appendToast: true,
                });
                this.$router.push('/login');
            }
        },
    },
}
</script>
