import SectionTitle from './SectionTitle';

const benefits = [
  'Saves time & reduces paperwork',
  'Easy and user-friendly interface',
  'Fast book search & management',
  'Accurate digital records',
  'Secure and reliable system'
];

function BenefitsSection() {
  return (
    <section id="benefits" className="section section-soft">
      <div className="container">
        <SectionTitle
          title="Why Choose Our System?"
          subtitle="Designed for institutions that need reliability, speed, and clarity."
        />
        <ul className="check-list">
          {benefits.map((benefit) => (
            <li key={benefit}>✔ {benefit}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BenefitsSection;