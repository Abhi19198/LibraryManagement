import SectionTitle from './SectionTitle';

const stats = [
  { label: 'Books Managed', value: '10,000+' },
  { label: 'Active Members', value: '3,000+' },
  { label: 'Daily Transactions', value: '500+' },
  { label: 'System Availability', value: '99.9%' }
];

function StatsSection() {
  return (
    <section id="stats" className="section section-light">
      <div className="container">
        <SectionTitle
          title="Library at a Glance"
          subtitle="Key metrics that highlight platform scale and reliability."
        />
        <div className="stats-grid">
          {stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;