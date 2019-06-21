<template>
    <transition-group name="list-complete" class="alert-container" tag="div">
        <div class="alert alert-dismissible list-complete-item" role="alert" v-for="alert in toasts" :key="alert.id" :class="['alert-' + alert.type]">
            {{alert.message}}
            <button type="button" class="close" v-on:click="remove(alert.id)">
                <span>&times;</span>
            </button>
        </div>
    </transition-group>
</template>

<style>
    .alert-container {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .alert {
        margin: 1rem;
    }

    .list-complete-item {
        transition: all 1s;
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateX(300px);
    }
    .list-complete-leave-active {
        width: max-content;
        position: absolute;
    }
    .close {
        outline: none !important;
    }
</style>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('toast', {
            toasts: state => state.toasts,
        }),
    },

    methods: {
        remove(alertId) {
            this.$store.commit('alert/removeAlert', alertId);
        }
    }
}
</script>
