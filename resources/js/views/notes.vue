<template>
<div class="m-auto p-6 ">
    <div class="flex">
        <h1 class="text-[20px] text-white">Listado de notas</h1>
        <button  @click="openModal()" class="w-10 h-10  bg-[#1E293B]  rounded-[10px] text-white text-[18px] absolute right-5 p-0">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
    <div  class="w-[450px] bg-slate-900 rounded-md ">
          <form @submit.prevent="validate" class="flex flex-col gap-2 p-8">
            <label class="flex items-center justify-between p-1 text-slate-400 text-[20px] mb-10">
              {{ nameForm }}  
            </label>
            <input 
              v-model="title"
              class="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
              type="text" 
              placeholder="titulo de la nota"
              required
              autocomplete="title" 
            >
            <input 
              class="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
              type="" 
              placeholder="description"
              required
              autocomplete="description"
              v-model="description"
            >
            <input 
              class="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
              type="label" 
              placeholder="label"
              required
              autocomplete="label" 
              v-model="label"
            >
            <button 
              type="submit"
              class="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            >
              {{ nameButtonForm }}
            </button>
            <button 
            @click="openModal()"
              type="close"
              class="inline-block cursor-pointer rounded-md bg-red-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            >
              cerrar
            </button>
          </form>
        </div>
    </div>

<!-- card de notas  -->
 <div class="flex gap-2">
<div v-for="note in validateNoteUser" :key="note.id" class="w-[310px] p-6 mt-4 bg-[#1E293B] border border-[#27344a] rounded-lg space-y-4 " >
<div class="flex items-center justify-between">
    <div class="flex items-center gap-2"></div>
</div>
<h1 class="capitalize text-white font-medium text-lg">
    {{ note.title }}
</h1>
<p class="text-slate-400 text-sm">
    {{ note.description }}
</p>
<div
    class="flex items-center gap-3 text-[13px] text-zinc-200 font-medium"
>
    <span>{{ note.label }}</span>
</div>
<div class="flex items-center gap-5">
<div class="flex items-center gap-5">
<!-- Icono de editar -->
<div
class="w-5 fill-slate-400 hover:fill-sky-400 duration-200 cursor-pointer mr-4"
@click="editItem(note.id)"
>
<button
    class="inline-flex items-center px-4 py-2 bg-gray-600 mr-4 transition ease-in-out delay-75 er:bg-gray-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
>
    <svg class="h-5 w-5" viewBox="0 0 512 512">
        viewBox="0 0 512 512">
        <path
            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
        ></path>
    </svg>
</button>
</div>
    <!-- Icono de borrar -->
    <div
        class="w-5 fill-slate-400 hover:fill-red-400 duration-200 cursor-pointer"
        @click="deleteItem(note.id)"
        >
            <div  
                class="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
            >
                <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                    ></path>
                </svg>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const notes = ref([]);
let isModalOpen = ref(false)
let editCreat = ref(1)
let title = ref()
let description = ref()
let label = ref()
let validateNoteUser = ref()

const user = computed(() => store.getters.currentUser);
const userId = computed(() => store.getters.userId  );

const fetchNotes = async () => {
    try {
        await store.dispatch("notes/fetchNotes");
        notes.value = store.getters["notes/allNotes"];
        console.log( notes.value);
         validateNoteUser.value = notes.value.filter(note => note.user_id == userId.value)
      
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
};


function openModal() {
    if (isModalOpen.value == true ) {
        isModalOpen.value = false
    }
    else{
        isModalOpen.value = true
    }
}

let nameForm = ref("Crear nota")
let nameButtonForm = ref("crear")


function validate() {
if (!title.value || !description.value || !label.value ) {
    alert('Por favor completa todos los campos para el crear nota.');
    return;
}
else{
 console.log(userId.value);
const data = {
title: title.value,
description: description.value,
label: label.value,
user_id: userId.value

};
handleSubmit(data)
}
}

async function handleSubmit(data) {
  console.log(data);
  try {
    let response;
    if (editCreat.value == 1) {
      console.log('Intentando registrar...');
      response = await store.dispatch('notes/addNoteAction', data);
    } else {
      console.log('Intentando iniciar sesión...');
      response = await store.dispatch('notes/editNoteAction', data);
    }
    console.log(response);

  } catch (error) {
    console.error('Error al realizar la operación:', error);

  }
}


async function deleteItem(id){
  console.log(id);
  
  try {
    await store.dispatch('notes/removeNoteAction', id); 
    validateNoteUser.value = notes.value.filter(note => note.user_id == userId.value); 
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
  }
}

onMounted(() => {
  console.log('user :', user.value);
  console.log('user :', userId.value);
});

onMounted(() => {
    fetchNotes();
});

</script>
