import SectionTitle from './SectionTitle';

const features = [
  {
    icon: '📖',
    title: 'Book Management',
    text: 'Add, update, and organize books effortlessly.'
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    text: 'Find books instantly by title, author, or category.'
  },
  {
    icon: '📅',
    title: 'Issue & Return Tracking',
    text: 'Monitor issued books and due dates.'
  },
  {
    icon: '👨‍🎓',
    title: 'Member Management',
    text: 'Manage students and library users efficiently.'
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    text: 'Track usage and maintain accurate records.'
  },
  {
    icon: '🔐',
    title: 'Secure Access',
    text: 'Role-based login for administrators and users.'
  }
];

function FeaturesSection() {
  return (
    <section id="features" className="section section-soft">
      <div className="container">
        <SectionTitle
          title="Powerful Features"
          subtitle="Built to improve operational accuracy, speed, and user experience."
        />
        <div className="card-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;