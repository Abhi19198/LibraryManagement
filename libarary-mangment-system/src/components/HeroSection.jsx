function HeroSection({ onGetStarted }) {
  return (
    <header className="hero">
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="container">
        <nav className="hero-nav">
          <div className="brand">
            <span className="brand-mark">✺</span>
            <span>SmartLibrary</span>
          </div>
          <div className="hero-nav-links">
            <a href="#about">About Us</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#benefits">Benefits</a>
            <a href="#audience">Who Can Use It</a>
          </div>
          <button className="nav-cta">Request Demo</button>
        </nav>

        <div className="hero-layout">
          <div className="hero-left">
            <p className="hero-rating">★★★★★ 4.8/5 rated by 16,000+ users</p>
            <h1>
              <span className="headline-accent">Smart Library</span> management,
              <br />
              built for modern institutions
            </h1>
            <p className="hero-subheading">
              Manage books, automate circulation, and keep records accurate with a secure digital platform
              designed for schools, colleges, and learning centers.
            </p>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={onGetStarted} type="button">
                Get Started
              </button>
              <button className="link-cta">Book a Demo →</button>
            </div>

            <div className="trust-box">
              <p>✔ Trusted by students & institutions</p>
              <p>✔ Fast • Secure • Reliable</p>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <article className="floating-card floating-card-top">
              <p className="floating-label">Daily Operations</p>
              <h3>1,284</h3>
              <span>Books issued this week</span>
            </article>
            <article className="floating-card floating-card-mid">
              <p className="floating-label">Due Date Tracker</p>
              <h3>97%</h3>
              <span>On-time returns</span>
            </article>
            <article className="floating-card floating-card-bottom">
              <p className="floating-label">Access Control</p>
              <h3>Secure</h3>
              <span>Role-based permissions enabled</span>
            </article>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;