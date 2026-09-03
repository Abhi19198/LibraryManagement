function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-mark">✺</span>
            <span>SmartLibrary</span>
          </div>
          <p className="footer-text">
            Professional library management software for modern institutions.
          </p>
        </div>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#benefits">Benefits</a>
        </div>

        <div className="footer-meta">
          <p>Email: hello@smartlibrary.io</p>
          <p>© 2026 SmartLibrary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;