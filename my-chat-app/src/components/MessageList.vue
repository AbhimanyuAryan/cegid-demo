<template>
  <div class="message-list">
    <div v-for="message in messages" :key="message._id" class="message-item">
      <div v-if="message.type === 'text'" class="message-text">
        <div v-html="markdownToHtml(message.content)"></div>
      </div>
      <div v-if="message.type === 'image'" class="message-image">
        <img :src="message.content" alt="Image" />
      </div>
      <div v-if="message.type === 'chart'" class="message-chart">
        <ChartComponent :data="formatChartData(message.content)" />
      </div>
      <div v-if="message.type === 'table'" class="message-table">
        <table>
          <thead>
            <tr>
              <th v-for="header in message.content.headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in message.content.rows" :key="row.join('-')">
              <td v-for="cell in row" :key="cell">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import MarkdownIt from "markdown-it";
import ChartComponent from "./ChartComponent.vue";

const props = defineProps({
  messages: Array,
});

const md = new MarkdownIt();

// Convert Markdown to HTML
const markdownToHtml = (markdown) => {
  return md.render(markdown);
};

// Format chart data to be compatible with Chart.js
const formatChartData = (data) => {
  try {
    if (data && typeof data === "string") {
      return JSON.parse(data);
    }
    if (data && data.labels && data.datasets) {
      return data;
    }
    return { labels: [], datasets: [] };
  } catch (error) {
    console.error("Error parsing chart data:", error.message);
    return { labels: [], datasets: [] };
  }
};
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  margin-bottom: 1.5rem; /* Increase space between messages */
  padding: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: #fff;
}

.message-text {
  word-break: break-word;
}

.message-image img {
  max-width: 100%;
  border-radius: 4px;
}

.message-chart {
  height: 300px; /* Adjust based on your chart size */
}

.message-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dcdcdc;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}
</style>
