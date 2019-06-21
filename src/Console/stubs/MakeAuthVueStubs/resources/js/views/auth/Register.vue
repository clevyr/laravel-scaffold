<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="onSubmit">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control"  :class="{ 'is-invalid': validationError('name') }" v-model="name" name="name" required autocomplete="name" autofocus>
                                    <span class="invalid-feedback" role="alert" v-if="validationError('name')">
                                        <strong>{{validationError('name')}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control"  :class="{ 'is-invalid': validationError('email') }" v-model="email" name="email" required autocomplete="email">
                                    <span class="invalid-feedback" role="alert" v-if="validationError('email')">
                                        <strong>{{validationError('email')}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control"  :class="{ 'is-invalid': validationError('password') }" v-model="password" name="password" required autocomplete="new-password">
                                    <span class="invalid-feedback" role="alert" v-if="validationError('password')">
                                        <strong>{{validationError('password')}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control"  :class="{ 'is-invalid': validationError('password_confirmation') }" v-model="password_confirmation" name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
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
            name: 'Garrett',
            email: 'garrettjcox@gmail.com',
            password: 'password',
            password_confirmation: 'password',
        };
    },

    computed: {
        ...mapState('auth/register', [
            'requestState',
            'error',
        ]),

        ...mapGetters('auth/register', [
            'validationError',
        ]),
    },

    methods: {
        async onSubmit() {
            await this.$store.dispatch('auth/register/sendRequest', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            });

            if (this.requestState === STATE_SUCCESS) {
                this.$store.dispatch('toast/addTimedToast', {
                    type: 'primary',
                    message: 'Account created successfully',
                });
                this.$router.push('/home');
            }
        }
    },

    created() {
        this.$store.commit('auth/register/reset');
    }
}
</script>
