<template>
    <span class="login100-form-title p-b-41">
        Registro
    </span>
    <form class="login100-form validate-form p-b-33 p-t-5"
          @submit.prevent="onSubmit">

        <div class="wrap-input100 validate-input" data-validate="Ingrese su nombre">
            <input v-model="userForm.name" class="input100" placeholder="Nombre" required type="text">
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Ingrese correo">
            <input v-model="userForm.email" class="input100" placeholder="Correo" required type="text">
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Ingrese contraseña">
            <input v-model="userForm.password" class="input100" placeholder="Contraseña" required type="password">
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button class="login100-form-btn">
                Crear cuenta
            </button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{name: 'login'}">¿Ya tienes una cuenta?</router-link>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import useAuth from '@/modules/auth/composables/useAuth';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
    name: 'Login',
    setup() {

        const { createUser } = useAuth();
        const router = useRouter();

        const userForm = ref( {
            name: 'Test User',
            email: 'test1@gmail.com',
            password: '123456'
        } );

        return {
            userForm,
            onSubmit: async () => {
                const { ok, message } = await createUser( userForm.value );

                if ( ok ) {
                    router.push( { name: 'no-entry' } );
                } else {
                    Swal.fire( 'Error', message, 'error' );
                }
            }
        };
    }
};
</script>

<style scoped>

</style>
