/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'leaflet/dist/leaflet-src.esm';
declare module '@vue-leaflet/vue-leaflet';