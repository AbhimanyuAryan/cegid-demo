<template>
  <div>
    <Line
      :data="data"
      :options="options"
      v-if="data && Object.keys(data).length > 0"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement, // Ensure this is imported
} from "chart.js";

// Register components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement // Register this element
);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": " + context.raw;
        },
      },
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
