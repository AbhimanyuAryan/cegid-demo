<!-- Login.vue -->
<template>
  <div class="form-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      label-width="120px"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
        <router-link to="/register" class="router-link">Register</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Form data
const loginForm = ref({
  username: "",
  password: "",
});

// Validation rules
const loginRules = {
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
  ],
};

const router = useRouter();
const loginFormRef = ref(null);

// Login function
const login = async () => {
  const form = loginFormRef.value;
  form.validate(async (valid) => {
    if (valid) {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/auth/login",
          loginForm.value
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        router.push("/chat");
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
      }
    } else {
      console.log("Form validation failed");
    }
  });
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.el-form-item {
  margin-bottom: 15px;
}

.el-form-item label {
  font-weight: bold;
}

.el-button {
  margin-right: 10px;
}

.router-link {
  text-decoration: none;
  color: #409eff;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
