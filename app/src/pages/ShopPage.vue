<template>
  <div class="shop-page">
    <div class="hero-overlay"></div>
    <div class="container">
      <h1 class="page-title">The Merchant's Wares</h1>
      <p class="page-subtitle">Support the realm and gain exclusive rewards.</p>
      
      <div class="subscriptions-grid">
        <!-- Tier 1: Initiate -->
        <div class="sub-card">
          <div class="card-header">
            <h3 class="tier-name">Initiate</h3>
            <p class="tier-price">$4.99 <span class="period">/ month</span></p>
          </div>
          <ul class="tier-features">
            <li><span class="check">✓</span> Unique "Initiate" Title</li>
            <li><span class="check">✓</span> 5% XP Bonus</li>
            <li><span class="check">✓</span> Daily Login Reward</li>
          </ul>
          <PSXButton class="sub-btn" fullWidth>Subscribe</PSXButton>
        </div>

        <!-- Tier 2: Adept -->
        <div class="sub-card featured">
          <div class="card-header">
            <div class="featured-badge">Most Popular</div>
            <h3 class="tier-name">Adept</h3>
            <p class="tier-price">$9.99 <span class="period">/ month</span></p>
          </div>
          <ul class="tier-features">
            <li><span class="check">✓</span> Unique "Adept" Title</li>
            <li><span class="check">✓</span> 10% XP Bonus</li>
            <li><span class="check">✓</span> Premium Daily Rewards</li>
            <li><span class="check">✓</span> Access to VIP Channel</li>
          </ul>
          <PSXButton class="sub-btn" fullWidth>Subscribe</PSXButton>
        </div>

        <!-- Tier 3: Master -->
        <div class="sub-card">
          <div class="card-header">
            <h3 class="tier-name">Master</h3>
            <p class="tier-price">$19.99 <span class="period">/ month</span></p>
          </div>
          <ul class="tier-features">
            <li><span class="check">✓</span> Unique "Master" Title</li>
            <li><span class="check">✓</span> 20% XP Bonus</li>
            <li><span class="check">✓</span> Exclusive Cosmetic Set</li>
            <li><span class="check">✓</span> Priority Queue Access</li>
            <li><span class="check">✓</span> Guild Creation Token</li>
          </ul>
          <PSXButton class="sub-btn" fullWidth>Subscribe</PSXButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PSXButton from '../components/PSXButton.vue'
</script>

<style scoped>
.shop-page {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: var(--spacing-2xl);
  background-color: var(--color-bg);
  background-image: url('/images/menu.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 5, 5, 0.85);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  text-align: center;
}

.page-title {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 4px 8px rgba(0,0,0,0.9);
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-dim);
  margin-bottom: var(--spacing-2xl);
  font-family: 'Garamond', serif;
}

.subscriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  align-items: start;
}

.sub-card {
  background: rgba(20, 20, 20, 0.9);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-xl);
  text-align: left;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sub-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  border-color: var(--color-accent-gold);
}

.sub-card.featured {
  background: rgba(30, 30, 30, 0.95);
  border-color: var(--color-accent-gold);
  box-shadow: 0 0 15px rgba(197, 160, 89, 0.1);
  transform: scale(1.05);
  z-index: 10;
}

.sub-card.featured:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.6), 0 0 20px rgba(197, 160, 89, 0.2);
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent-gold);
  color: #000;
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 2px;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.card-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.tier-name {
  font-size: 1.5rem;
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-xs);
}

.tier-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  font-family: 'Cinzel', serif;
}

.period {
  font-size: 1rem;
  color: var(--color-text-dim);
  font-weight: 400;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-xl);
}

.tier-features li {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-dim);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.check {
  color: var(--color-accent-gold);
  font-weight: bold;
}

.sub-btn {
  margin-top: auto;
}

@media (max-width: 900px) {
  .sub-card.featured {
    transform: none;
  }
  
  .sub-card.featured:hover {
    transform: translateY(-5px);
  }
}
</style>
