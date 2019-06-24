<template>
    <div class="flex-fill overflow-scroll d-flex">
        <div class="container flex-fill d-md-flex pt-5 pt-md-0 align-items-center justify-content-center">
            <b-form
                novalidate
                @submit.prevent="onSubmit"
                @keydown="clearValidationError($event.target.name)"
                class="col-md-8 col-lg-6 pb-5"
            >
                <h1 class="text-center">Forgot your password?</h1>
                <h5 class="mb-5 text-center text-muted">Enter your information below:</h5>

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
                            autofocus
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
                    <button type="submit" class="btn btn-lg btn-primary btn-block" :disabled="$v.$invalid || inProgress">
                        <div class="spinner-grow spinner-grow-sm text-light" role="status" v-if="inProgress">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <span v-else>Send Password Reset Link</span>
                    </button>
                </div>

                <div class="text-center mt-5 text-muted">
                    <router-link class="btn-link" to="/login">Go Back</router-link>
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
} from 'vuelidate/lib/validators';
import { mapState, mapGetters, mapMutations } from 'vuex';

import { STATE_SUCCESS } from '../../../constants/requestStates';
import { inputState } from '../../../utils/formUtils';

export default {
    data() {
        return {
            form: {
                email: 'garrettjcox@gmail.com',
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
            }
        };
    },

    computed: {
        ...mapState('auth/passwords/email', [
            'requestState',
            'error',
        ]),

        ...mapGetters('auth/passwords/email', [
            'hasValidationError',
            'getValidationError',
            'inProgress',
        ]),
    },

    methods: {
        inputState,
        ...mapMutations('auth/passwords/email', [
            'clearValidationError',
        ]),

        async onSubmit() {
            this.$v.form.$touch();

            await this.$store.dispatch('auth/passwords/email/sendRequest', this.form);

            if (this.requestState === STATE_SUCCESS) {
                this.$bvToast.toast('We have e-mailed your password reset link!', {
                    title: 'Success',
                    toaster: 'b-toaster-bottom-right',
                    variant: 'primary',
                    autoHideDelay: 5000,
                    solid: true,
                    appendToast: true,
                });
                this.$router.push('/login');
            }
        }
    },

    created() {
        this.$store.commit('auth/passwords/email/reset');
    }
}
</script>
