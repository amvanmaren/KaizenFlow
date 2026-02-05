<template>
  <div class="login-outer">
    <img class="logo" src="@/assets/logo.svg" alt="KaizenFlow Logo" />
    <div class="welcome-message">Welcome to KaizenFlow</div>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <h3>Don't have an account?</h3>
      <router-link to="/register" class="register-link-button">Register</router-link>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ""; // Clear previous error message

      if (!this.username.trim() || !this.password.trim()) {
        this.errorMessage = 'Username and password are both required.';
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Invalid username or password");
        }

        const data = await response.json();
        // Handle successful login (e.g., save token, redirect)
        console.log("Login successful:", data);
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.login-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 12px;
}

.welcome-message {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 24px;
  color: green
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: green;
}

h3 {
  text-align: center;
  color: green;
}

.form-group {
  margin-bottom: 15px;
  color: green;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #0056b3;
}

.register-link-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  display: block;
  margin-top: 10px;
  font-size: 1rem;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>