<template>
  <div class="chat-container">
    <el-card class="chat-card">
      <div class="header">
        <h2>Chat</h2>
        <el-button @click="logout" type="danger" size="small">Logout</el-button>
      </div>
      <div class="message-list">
        <MessageList :messages="messages" />
      </div>
      <el-form class="message-form">
        <el-form-item>
          <el-select v-model="newMessage.type" placeholder="Select type">
            <el-option label="Text" value="text" />
            <el-option label="Image" value="image" />
            <el-option label="Chart" value="chart" />
            <el-option label="Table" value="table" />
          </el-select>
        </el-form-item>
        <el-form-item label="Message">
          <el-input
            type="textarea"
            v-model="newMessage.content"
            placeholder="Type your message"
            rows="4"
          />
        </el-form-item>
        <el-button @click="sendMessage" type="primary">Send</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MessageList from "../components/MessageList.vue";
import { useRouter } from "vue-router";

const messages = ref([]);
const newMessage = ref({ type: "text", content: "" });
const router = useRouter();

// Fetch messages from the backend
const fetchMessages = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/messages", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    messages.value = response.data;
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error.response?.data || error.message
    );
  }
};

// Get User ID from Token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
};

// Send a new message
const sendMessage = async () => {
  try {
    const userId = getUserIdFromToken();
    if (!userId) throw new Error("User ID not found");

    await axios.post(
      "http://localhost:5001/api/messages",
      {
        type: newMessage.value.type,
        content: newMessage.value.content,
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    newMessage.value.content = "";
    fetchMessages();
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
  }
};

// Logout function
const logout = () => {
  localStorage.removeItem("accessToken");
  router.push("/");
};

onMounted(fetchMessages);
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.chat-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  margin: 0;
}

.message-list {
  flex: 1;
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.message-list .message {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.message-list .message:nth-child(even) {
  background-color: #f1f1f1;
}

.message-form {
  display: flex;
  flex-direction: column;
}

.el-form-item {
  margin-bottom: 1rem;
}

.el-select {
  width: 100%; /* Ensure select is wide enough */
}

.el-button {
  margin-left: auto;
}
</style>
