<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="onSubmit">

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" :class="{ 'is-invalid': validationError('email') }" name="email" v-model="email" required autocomplete="email" autofocus>
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{validationError('email')}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" :class="{ 'is-invalid': validationError('password') }" name="password" v-model="password" required autocomplete="current-password">

                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{validationError('password')}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                    <router-link class="btn btn-link" to="/password/email">
                                        Forgot Your Password?
                                    </router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { STATE_SUCCESS } from '../../constants/requestStates';

export default {
    data() {
        return {
            email: 'garrettjcox@gmail.com',
            password: 'password',
        };
    },

    computed: {
        ...mapState('auth/login', [
            'requestState',
            'error',
        ]),

        ...mapGetters('auth/login', [
            'validationError',
        ]),
    },

    methods: {
        async onSubmit() {
            await this.$store.dispatch('auth/login/sendRequest', {
                email: this.email,
                password: this.password,
            });

            if (this.requestState === STATE_SUCCESS) {
                this.$router.push(this.$route.query.redirect || '/home');
            }
        }
    },

    created() {
        this.$store.commit('auth/login/reset');
    }
}
</script>
