  <script>
  import { ref, watch } from 'vue'

  /* this makes use of Vue 3's v-model:propName syntax to have two-way control over the 'show' prop
  we defined this component with the option v-model:show="showBanner" in HomeView.vue
  this means the showBanner variable in the parent corresponds to the 'show' prop in this component.
  Its basically v-model except you get to name the prop! so you can have multiple v-models corresponding to different props

  This component is designed to be multi-functional in the sense that it is a banner than can show errors, successes and general info based on its props
  while there are loads of event handlers throughout the app (@error, @success) that fire up the stack, App.vue handles them and transposes them into props to show the correct banner
  Single point of control over this component also reduces risk of interference, two banners at once etc.
  */
  
  export default {
    name: 'InfoBanner',
    props: {
      message: {type: String, required: true},
      type: {type: String, required: true},
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
      <div v-if="visible" class="info-banner" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  
  <style scoped>
  .info-banner {
    position: fixed;
    top: 20px;
    left: 50%;
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 9999;
  }

  .error {
    background-color: #f44336;
    color: white;
  }

  .success {
    background-color: #9fdb5e;
    color: black;
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
  