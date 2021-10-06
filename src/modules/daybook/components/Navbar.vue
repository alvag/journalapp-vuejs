<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img alt="logo"
                 class="d-inline-block align-text-top mx-2"
                 height="24" src="@/assets/logo.png">
            {{ username }}
        </a>

        <div class="d-flex">
            <button class="btn btn btn-outline-info mx-2" @click="onLogout">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import useAuth from '@/modules/auth/composables/useAuth';
import { useRouter } from 'vue-router';

export default {
    name: 'Navbar',
    setup() {
        const router = useRouter();
        const { username, logout } = useAuth();

        return {
            username,
            onLogout: () => {
                router.push( { name: 'login' } );
                logout();
            }
        };
    }
};
</script>

<style scoped>

</style>
