<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">
                        You are logged in!
                        <button class="btn btn-primary" @click="emit">Emit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        emit() {
            this.$bvToast.toast('Success', {
                title: 'BootstrapVue Toast',
                toaster: 'b-toaster-bottom-right',
                variant: 'primary',
                autoHideDelay: 5000,
                solid: true,
                appendToast: true,
            });
        }
    }
}
</script>
