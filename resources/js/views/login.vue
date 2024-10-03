<template>
  <div class="grid grid-cols-6 ">
  <div class="col-span-4 bg-[#1f2937] w-full h-full p-24">
    <div class="w-[95%] ">
      <p class="text-[50px] text-white font-mono">TUS <strong class="font-bold text-green-600">NOTAS</strong>, <br> SIEMPRE SEGURAS Y BIEN <br> ORGANIZADAS.</p>
    </div>
    
  </div>
  <div class="col-span-2 min-h-[100vh] flex justify-end">
    <div class="w-full bg-slate-900">
      <div class="col-span-2 min-h-[100vh] flex justify-end">
        <div class="w-full bg-slate-900">
          <form @submit.prevent="validate" class="flex flex-col gap-2 p-8">
            <label class="flex items-center justify-between p-1 text-slate-400 text-[20px] mb-10">
              {{ nameForm }}  
            </label>
            <input 
              v-if="showInputNameUser" 
              v-model="nameUser"
              class="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
              type="text" 
              placeholder="Nombre usuario"
              required
              autocomplete="username" 
            >
            <input 
              class="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
              type="email" 
              placeholder="Email"
              required
              autocomplete="email"
              v-model="email"
            >
            <input 
              class="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
              type="password" 
              placeholder="Password"
              required
              autocomplete="current-password" 
              v-model="password"
            >
            <button 
              type="submit"
              class="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            >
              {{ nameButtonForm }}
            </button>
            <p v-if="!showInputNameUser" @click="createAccount()" class="text-center mt-6 cursor-pointer text-white">
              Crea tu cuenta
            </p>
            <p v-if="showInputNameUser" @click="createAccount()" class="text-center mt-6 cursor-pointer text-white">
              Iniciar sesion
            </p>
            <!-- <router-link to="/notes">asd  </router-link> -->
          </form>
        </div>
      </div>
      
    </div>
  </div>
  
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import { useStore } from "vuex"; 
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore(); 
let nameForm = ref("Iniciar sesion")
let nameButtonForm = ref("Inicia sesion")
let showInputNameUser =  ref(false)

let nameUser = ref()
let email = ref()
let password = ref()

function createAccount() {
  if (showInputNameUser.value == false) {
    nameForm.value = "Crear cuenta "
  nameButtonForm.value = "Registrate "
  showInputNameUser.value = true
  }
  else{
    nameForm.value = "Iniciar sesion "
  nameButtonForm.value = "Inicia sesion"
  showInputNameUser.value = false
  }
}


function validate() {
  if (showInputNameUser.value) {
    if (!email.value || !nameUser.value || !password.value ) {
      alert('Por favor completa todos los campos para el registro.');
      return;
    }
    else{
      const credentials = {
      name: nameUser.value,
      user: email.value,
      password: password.value,
    };

    handleSubmit(credentials)
  }
  }
  else{
    if (!email.value || !password.value) {
      alert('Por favor completa todos los campos para el logueo.');
      return;
    }
    else{
      const credentials = {
      user: email.value,
      password: password.value
    };

    handleSubmit(credentials)
  }
}
}
  
async function handleSubmit(credentials) {
  console.log(credentials);
  try {
    let response;
    if (showInputNameUser.value) {
      console.log('Intentando registrar...');
      response = await store.dispatch('register', credentials);
    } else {
      console.log('Intentando iniciar sesión...');
      response = await store.dispatch('login', credentials);
    }
    console.log(response);
    
    if (response) {
      localStorage.setItem('token', response.data.token); 
      const userId = store.getters['users/userId'];
      console.log('Operación exitosa:', response);
       router.push('/notes'); 
    } else {
      console.error('No se pudo realizar la operación');

    }
  } catch (error) {
    console.error('Error al realizar la operación:', error);

  }
}

</script>
