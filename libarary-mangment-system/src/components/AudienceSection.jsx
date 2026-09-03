import SectionTitle from './SectionTitle';

const audience = [
  'Schools & Colleges',
  'Universities',
  'Coaching Institutes',
  'Public Libraries',
  'Digital Learning Centers'
];

function AudienceSection() {
  return (
    <section id="audience" className="section section-soft">
      <div className="container">
        <SectionTitle
          title="Perfect For"
          subtitle="Flexible enough for academic and public learning environments."
        />
        <div className="audience-wrap">
          {audience.map((item) => (
            <span className="audience-pill" key={item}>
              ✔ {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AudienceSection;