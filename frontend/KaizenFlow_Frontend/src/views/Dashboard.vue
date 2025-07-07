<template>
  <div class="dashboard-outer">
    <h1>Dashboard</h1>
    <div class="summary-cards">
      <div class="summary-card">
        <h2>GitHub</h2>
        <div v-if="github">
          <p><strong>Username:</strong> {{ github.username }}</p>
          <p><strong>Public Repos:</strong> {{ github.publicRepos }}</p>
          <p><strong>Recent Commits:</strong> {{ github.recentCommits }}</p>
        </div>
        <div v-else>
          <p>GitHub account not linked.</p>
        </div>
      </div>
      <div class="summary-card">
        <h2>WaniKani</h2>
        <div v-if="wanikani">
          <p><strong>Level:</strong> {{ wanikani.level }}</p>
          <p><strong>Reviews Completed:</strong> {{ wanikani.reviewsCompleted }}</p>
          <p><strong>Lessons Completed:</strong> {{ wanikani.lessonsCompleted }}</p>
        </div>
        <div v-else>
          <p>WaniKani account not linked.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      github: null,
      wanikani: null,
    };
  },
  async mounted() {
    // Replace these fetches with your real API endpoints
    try {
      // Example: Fetch GitHub summary
      const githubRes = await fetch("http://localhost:3000/api/github/summary", { credentials: 'include' });
      if (githubRes.ok) this.github = await githubRes.json();

      // Example: Fetch WaniKani summary
      const wanikaniRes = await fetch("http://localhost:3000/api/wanikani/summary", { credentials: 'include' });
      if (wanikaniRes.ok) this.wanikani = await wanikaniRes.json();
    } catch (e) {
      // Handle errors as needed
    }
  },
};
</script>

<style scoped>
.dashboard-outer {
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid #ccc;
  justify-content: center;
}
.summary-cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
.summary-card {
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1.5rem;
  min-width: 250px;
  flex: 1 1 300px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  color: black;
  
}
.summary-card h2 {
  margin-top: 0;
  color: black;
}
</style>