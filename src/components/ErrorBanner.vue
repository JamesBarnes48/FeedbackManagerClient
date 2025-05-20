  <script>
  import { ref, watch } from 'vue'

  /* this makes use of Vue 3's v-model:propName syntax to have two-way control over the 'show' prop
  we defined this component with the option v-model:show="showError" in HomeView.vue
  this means the showError variable in the parent corresponds to the 'show' prop in this component.
  Its basically v-model except you get to name the prop! so you can have multiple v-models corresponding to different props
  */
  
  export default {
    name: 'ErrorBanner',
    props: {
      message: {type: String, required: true},
      show: {type: Boolean, required: true}
    },
    setup(props, { emit }) {
      const visible = ref(props.show)
  
      //watches props.show to see if it changes to true. If so, set flag and timeout to unset flag
      watch(() => props.show, (newVal) => {
        if (newVal) {
          visible.value = true
          setTimeout(() => {
            visible.value = false
            emit('update:show', false)
          }, 3000)
        }
      })
  
      return {
        visible
      }
    }
  }
  </script>

<template>
    <transition name="slide-fade">
      <div v-if="visible" class="error-banner">
        {{ message }}
      </div>
    </transition>
  </template>
  
  
  <style scoped>
  .error-banner {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f44336;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 9999;
  }
  
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>
  