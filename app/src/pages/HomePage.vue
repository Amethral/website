<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">AMETHRAL</h1>
          <p class="hero-subtitle">
            A next-generation MMORPG experience
          </p>
          <p class="hero-description">
            Explore a vast open world, engage in epic battles, and forge your legend in the realm of Amethral.
          </p>
          
          <div class="hero-ctas">
            <router-link to="/login" class="btn btn-primary btn-large">
              Play Now
            </router-link>
            <button class="btn btn-large">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title text-center">Features</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <h3 class="feature-title">Massive Open World</h3>
            <p class="feature-text">
              Explore diverse landscapes filled with secrets, dungeons, and adventures.
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Real-Time Combat</h3>
            <p class="feature-text">
              Engage in fast-paced action combat with responsive controls and fluid mechanics.
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Player Guilds</h3>
            <p class="feature-text">
              Join forces with other players to form powerful guilds and conquer challenges.
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Character Progression</h3>
            <p class="feature-text">
              Customize your character with unique skills, abilities, and equipment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="cta-title">Ready to Begin Your Journey?</h2>
        <p class="cta-text">
          Create your account and start playing today.
        </p>
        <router-link to="/login" class="btn btn-primary btn-large">
          Get Started
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4 class="footer-title">AMETHRAL</h4>
            <p class="footer-text">
              A modern MMORPG experience.
            </p>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">Links</h4>
            <ul class="footer-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/login">Play Now</router-link></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">Legal</h4>
            <ul class="footer-links">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2024 Amethral. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    var(--color-bg) 0%,
    var(--color-bg-light) 100%
  );
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-2xl) 0;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  letter-spacing: 2px;
  background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.hero-description {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-2xl);
  line-height: 1.8;
}

.hero-ctas {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

/* Features Section */
.features-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-bg);
}

.section-title {
  margin-bottom: var(--spacing-2xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  padding: var(--spacing-xl);
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.feature-text {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 0;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-bg-light);
}

.cta-title {
  margin-bottom: var(--spacing-md);
}

.cta-text {
  font-size: 1.15rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

/* Footer */
.footer {
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

.footer-title {
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.footer-text {
  font-size: 0.9rem;
  margin-bottom: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: var(--color-text-dim);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-bottom p {
  font-size: 0.9rem;
  color: var(--color-text-dim);
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
