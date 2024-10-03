<template>
    <div class="min-h-[100vh] bg-[#4b5563] ">
      <Nav v-if="!$route.meta.hideNav" />
      <router-view ></router-view>
     
    </div>
  </template>
  
  <script setup>
  import {ref} from "vue"
  import Nav from "./components/nav.vue"


  </script>
  
  <style scoped>

  </style>
  