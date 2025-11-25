<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <img src="/images/TRANSPARENT_LOGO.png" alt="AMETHRAL" class="hero-title-img" />
          <p class="hero-subtitle">
            A Dark Fantasy MMORPG Experience
          </p>
          <p class="hero-description">
            Explore a vast, unforgiving open world. Engage in visceral combat. Forge your legend in the shadows of Amethral.
          </p>
          
          <div class="hero-ctas">
            <PSXButton href="/login">
              Enter the Realm
            </PSXButton>

          </div>
        </div>
      </div>
      
      <!-- Separator to Features -->
      <div class="hero-separator">
        <SectionSeparator color="#121212" direction="bottom" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title text-center">Game Features</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <h3 class="feature-title">Massive Open World</h3>
            <p class="feature-text">
              Traverse a seamless, hauntingly beautiful world filled with ancient ruins, dark forests, and towering citadels.
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Visceral Combat</h3>
            <p class="feature-text">
              Master a punishing yet rewarding combat system. Every strike counts, every dodge matters.
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Guild Warfare</h3>
            <p class="feature-text">
              Form alliances and wage war for territory and resources in large-scale PvP battles.
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Deep Progression</h3>
            <p class="feature-text">
              Customize your character with a vast array of weapons, armor, and dark magic.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Separator to CTA -->
      <div class="features-separator">
        <SectionSeparator color="#050505" direction="bottom" />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="cta-title">Your Destiny Awaits</h2>
        <p class="cta-text">
          The gates of Amethral are open. Will you conquer the darkness, or be consumed by it?
        </p>
        <PSXButton href="/login">
          Begin Journey
        </PSXButton>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <SectionSeparator color="#000000" direction="top" />
      <div class="container footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h4 class="footer-title">AMETHRAL</h4>
            <p class="footer-text">
              A dark fantasy MMORPG.
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
import PSXButton from '../components/PSXButton.vue'
import SectionSeparator from '../components/SectionSeparator.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/images/menu.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding-bottom: 15vh; /* Lift content visually */
  /* Removed border-bottom as we have separator */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  z-index: 1;
}

.hero-section .container {
  position: relative;
  z-index: 2;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-separator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}

.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 80px auto 0; /* Added top margin to clear navbar */
  padding: var(--spacing-2xl) 0;
  text-shadow: 0 4px 8px rgba(0,0,0,0.9);
}

.hero-title-img {
  max-width: 85%; /* Reduced from 100% (900px) */
  height: auto;
  margin-bottom: var(--spacing-md);
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.8)); /* Hard shadow instead of glow */
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-subtitle {
  font-size: 2rem;
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-lg);
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-description {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto var(--spacing-2xl);
  line-height: 1.8;
  color: #cccccc;
  font-family: 'Garamond', serif;
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
  background-color: var(--color-bg-light); /* Dark Gray */
  position: relative;
  padding-top: 60px; /* Space for separator overlap */
}

.features-separator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}

.section-title {
  margin-bottom: var(--spacing-2xl);
  color: var(--color-accent-gold);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  padding: var(--spacing-xl);
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent-gold), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  border-color: var(--color-accent-gold);
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
  background: rgba(30, 30, 30, 0.9);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
  font-family: 'Cinzel', serif;
}

.feature-text {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 0;
  color: var(--color-text-dim);
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-2xl) 0;
  background-color: var(--color-bg); /* Deep Black */
  position: relative;
  padding-top: 60px;
}

.cta-title {
  margin-bottom: var(--spacing-md);
  color: var(--color-accent-gold);
}

.cta-text {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
  font-family: 'Garamond', serif;
  font-style: italic;
}

/* Footer */
.footer {
  padding: 0 0 var(--spacing-lg);
  background: #000000;
  position: relative;
}

.footer-container {
  padding-top: var(--spacing-2xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

.footer-title {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-accent-gold);
  font-family: 'Cinzel', serif;
}

.footer-text {
  font-size: 1rem;
  margin-bottom: 0;
  color: var(--color-text-dim);
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
  font-size: 1rem;
  transition: color 0.2s ease;
  font-family: 'Garamond', serif;
}

.footer-links a:hover {
  color: var(--color-accent-gold);
  text-decoration: underline;
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
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
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
