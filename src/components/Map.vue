<template>
  <div class="m-5 border-gray-400">
    <l-map
      :zoom="zoom"
      :max-zoom="18"
      :min-zoom="10"
      :center="center"
      :zoomAnimation="true"
      :inertiaMaxSpeed="1"
      :bounds="bounds"
      :max-bounds="maxBounds"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="marker">
        <l-tooltip :options="{ permanent: true, interactive: true }"
          ><a href="https://goo.gl/maps/6ngUM3z9ukWG97T78" target="_blank">
            Salle Georges Campo <br />
            Rue de la source <br />Villeneuve-les-beziers</a
          >
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import { latLngBounds, latLng } from "leaflet/dist/leaflet-src.esm";

export default defineComponent({
  name: "App",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  setup() {
    const zoom = ref(17);
    const center = latLng(43.313632692723075, 3.286379692212575);
    const url = ref("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    const attribution = ref(
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    );
    const marker = latLng(43.313632692723075, 3.286379692212575);
    const bounds = latLngBounds([
      [43.313632692723075, 3.286379692212575],
      [43.313632692723075, 3.286379692212575],
    ]);
    const maxBounds = latLngBounds([
      [43.313632692723075, 3.286379692212575],
      [43.313632692723075, 3.286379692212575],
    ]);

    return {
      zoom,
      center,
      url,
      attribution,
      marker,
      bounds,
      maxBounds,
    };
  },
});
</script>

function latLngBounds(arg0: number, arg1: number) { throw new Error("Function
not implemented."); }
