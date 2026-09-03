import SectionTitle from './SectionTitle';

const steps = [
  'Login to the system',
  'Search or browse books',
  'Issue or return books',
  'Track due dates & history'
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section section-light">
      <div className="container">
        <SectionTitle
          title="How It Works"
          subtitle="A simple workflow that keeps circulation and records in sync."
        />
        <ol className="steps-list">
          {steps.map((step, index) => (
            <li key={step}>
              <span className="step-number">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorksSection;