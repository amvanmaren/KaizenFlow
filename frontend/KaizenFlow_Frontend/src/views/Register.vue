<template>
    <div class="register-outer">
        <img class="logo" src="@/assets/logo.svg" alt="KaizenFlow Logo" />
        <div class="welcome-message">Welcome to KaizenFlow</div>
        <div class="register-container">
            <h1>Register</h1>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" placeholder="Enter your username" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter your password"
                        required />
                </div>
                <button type="submit" class="register-button" :disabled="isLoading">
                    {{ isLoading ? 'Registering...' : 'Register' }}
                </button>
            </form>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            isLoading: false, // prevent duplicate submissions
        };
    },
    methods: {
        async handleRegister() {
            this.errorMessage = ''; // Clear previous error message

            // Validation
            if (!this.username.trim() || !this.password.trim()) {
                this.errorMessage = 'Username and password are both required.';
                return;
            }

            this.isLoading = true;

            try {
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });

            if (!response.ok) {
                throw new Error('Registration failed.');
            }

            // Redirect to login upon success
            this.$router.push('/login');
        } catch(error) {
            this.errorMessage = error.message || 'An error occurred during registration.';
            console.error('Registration error', error);
        } finally {
            this.isLoading = false;
        }
    },

},
};
</script>

<style scoped>
.register-outer {
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

.register-container {
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

.register-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.register-button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}
</style>