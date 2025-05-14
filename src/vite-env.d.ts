/// <reference types="vite/client" />

//need this so typescript can import vue files!!
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }