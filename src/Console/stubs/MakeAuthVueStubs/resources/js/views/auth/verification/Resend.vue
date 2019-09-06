<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Verify Your Email Address</div>

                    <div class="card-body">
                        Before proceeding, please check your email for a verification link.
                        If you did not receive the email <a @click="onSubmit" class="btn btn-primary text-white">click here to request another</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('auth/verification/resend', [
            'requestState',
        ]),
    },

    methods: {
        async onSubmit() {
            await this.$store.dispatch('auth/verification/resend/sendRequest');
        },
    },

    created() {
        this.$store.commit('auth/verification/resend/reset');
    },
}
</script>
