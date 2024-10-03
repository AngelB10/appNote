<template>
    <div class="w-full h-[50px] flex items-center border-b-[1px] border-black bg-black">
        <div class=" w-32">
            <h1 class="font-bold ml-2 text-[18px] text-white">App de Notas</h1>
        </div>
        <div class="bg-red-600 rounded-full w-8 h-8 absolute right-4 cursor-pointer " @click="logout"> 
            <div class="text-white ml-2 mt-1">
                <font-awesome-icon :icon="['fas', 'user']" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();   
const router = useRouter();
const logout = async () => {
  try {
    await store.dispatch('logout'); 
    router.push('/');
  } catch (error) {
    console.error('Error al desloguearse:', error);
  }
};
</script>