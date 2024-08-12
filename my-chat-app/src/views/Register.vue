<!-- Register.vue -->
<template>
  <div class="form-container">
    <el-form
      :model="registerForm"
      :rules="registerRules"
      ref="registerFormRef"
      label-width="120px"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="registerForm.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="registerForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Register</el-button>
        <router-link to="/login">Login</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Form data
const registerForm = ref({
  username: "",
  password: "",
});

// Validation rules
const registerRules = {
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
  ],
};

const router = useRouter();
const registerFormRef = ref(null);

// Register function
const register = async () => {
  const form = registerFormRef.value;
  form.validate(async (valid) => {
    if (valid) {
      try {
        await axios.post(
          "http://localhost:5001/api/auth/register",
          registerForm.value
        );
        router.push("/login");
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
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
