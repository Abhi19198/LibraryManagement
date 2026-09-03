import SectionTitle from './SectionTitle';

function AboutSection() {
  return (
    <section id="about" className="section section-light">
      <div className="container">
        <SectionTitle
          title="What is Our Library Management System?"
          subtitle="A centralized digital platform that simplifies daily library workflows."
        />
        <p className="lead-paragraph">
          Our Library Management System is a digital solution designed to simplify the management of books,
          members, and transactions. It replaces manual record-keeping with a fast, secure, and easy-to-use
          platform.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;