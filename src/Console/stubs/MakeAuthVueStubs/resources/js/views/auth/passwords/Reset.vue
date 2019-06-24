<template>
    <div class="flex-fill overflow-scroll d-flex">
        <div class="container flex-fill d-md-flex pt-5 pt-md-0 align-items-center justify-content-center">
            <b-form
                novalidate
                @submit.prevent="onSubmit"
                @keydown="clearValidationError($event.target.name)"
                class="col-md-8 col-lg-6 pb-5"
            >
                <h1 class="text-center">Enter your new password,</h1>
                <h5 class="mb-5 text-center text-muted">Choose wisely:</h5>

                <div class="form-group">
                    <label for="email">Email Address</label>

                    <div>
                        <b-form-input
                            id="email"
                            type="email"
                            class="form-control form-control-lg"
                            :state="inputState('email')"
                            name="email"
                            v-model.trim="$v.form.email.$model"
                            autocomplete="email"
                            required
                            placeholder="you@example.com"
                        />
                        <span class="invalid-feedback" role="alert">
                            <p class="mb-0" v-if="!$v.form.email.noValidationError"> {{ getValidationError('email') }} </p>
                            <p class="mb-0" v-if="!$v.form.email.required">Email is required</p>
                            <p class="mb-0" v-if="!$v.form.email.email">Please enter a valid email.</p>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>

                    <div>
                        <b-form-input
                            id="password"
                            type="password"
                            class="form-control form-control-lg"
                            :state="inputState('password')"
                            name="password"
                            v-model.trim="$v.form.password.$model"
                            autocomplete="password"
                            required
                            placeholder="Enter 8 characters or more"
                        />
                        <span class="invalid-feedback" role="alert">
                            <p class="mb-0" v-if="!$v.form.password.noValidationError"> {{ getValidationError('password') }} </p>
                            <p class="mb-0" v-if="!$v.form.password.required">Password is required</p>
                            <p class="mb-0" v-if="!$v.form.password.minLength">Password must be at least 8 characters</p>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Password Confirmation</label>

                    <div>
                        <b-form-input
                            id="password_confirmation"
                            type="password"
                            class="form-control form-control-lg"
                            :state="inputState('password_confirmation')"
                            name="password_confirmation"
                            v-model.trim="$v.form.password_confirmation.$model"
                            autocomplete="password_confirmation"
                            required
                            placeholder="Enter the same as above"
                        />
                        <span class="invalid-feedback" role="alert">
                            <p class="mb-0" v-if="!$v.form.password_confirmation.noValidationError"> {{ getValidationError('password_confirmation') }} </p>
                            <p class="mb-0" v-if="!$v.form.password_confirmation.required">Password confirmation is required</p>
                            <p class="mb-0" v-if="!$v.form.password_confirmation.sameAs">Password confirmation must match the password above</p>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-lg btn-primary btn-block" :disabled="$v.$invalid || inProgress">
                        <div class="spinner-grow spinner-grow-sm text-light" role="status" v-if="inProgress">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <span v-else>Reset Password</span>
                    </button>
                </div>

                <div class="text-center mt-5 text-muted">
                    <router-link class="btn-link" to="/login">Go back</router-link>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import {
    email,
    required,
    minLength,
    sameAs,
} from 'vuelidate/lib/validators';
import { mapState, mapGetters, mapMutations } from 'vuex';

import { STATE_SUCCESS } from '../../../constants/requestStates';
import { inputState } from '../../../utils/formUtils';

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                password_confirmation: '',
            },
        };
    },

    validations() {
        return {
            form: {
                email: {
                    email,
                    required,
                    noServerError: () => !this.hasValidationError('email'),
                },
                password: {
                    minLength: minLength(8),
                    required,
                    noServerError: () => !this.hasValidationError('password'),
                },
                password_confirmation: {
                    sameAs: sameAs('password'),
                    required,
                    noServerError: () => !this.hasValidationError('password_confirmation'),
                },
            }
        };
    },

    computed: {
        ...mapState('auth/passwords/reset', [
            'requestState',
            'error',
        ]),

        ...mapGetters('auth/passwords/reset', [
            'hasValidationError',
            'getValidationError',
            'inProgress',
        ]),
    },

    methods: {
        inputState,
        ...mapMutations('auth/passwords/reset', [
            'clearValidationError',
        ]),

        async onSubmit() {
            this.$v.form.$touch();

            await this.$store.dispatch('auth/passwords/reset/sendRequest', {
                token: this.$route.params.token,
                ...this.form,

            });

            if (this.requestState === STATE_SUCCESS) {
                this.$bvToast.toast('Password successfully changed', {
                    title: 'Success',
                    toaster: 'b-toaster-bottom-right',
                    variant: 'success',
                    autoHideDelay: 5000,
                    solid: true,
                    appendToast: true,
                });

                this.$router.push('/login');
            }
        }
    },

    created() {
        this.$store.commit('auth/passwords/reset/reset');
    }
}
</script>
