import "./About.css";

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-text">
          <h2>Our Story</h2>
          <p className="about-subtitle">
            Disqueria What? — more than a record shop.
          </p>
        </div>
        <div className="about-hero-img">
          <img
            src="/images/about-hero.jpg"
            alt="Disqueria What? storefront or interior"
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h3>How It All Started</h3>
          <p>
            Disqueria What? was born from a simple idea: curate a selection of
            vinyl records that truly matter. What started as a personal
            collection shared among friends has grown into a destination for
            collectors and music lovers who care about quality over quantity.
          </p>
          <p>
            Every record in our catalogue is hand-picked. We dig through crates,
            estate sales, and private collections so you don't have to —
            bringing you pressings that sound as good as they look on the shelf.
          </p>
        </div>
        <div className="about-img-row">
          <img src="/images/about-crate-digging.jpg" alt="Crate digging" />
          <img
            src="/images/about-vinyl-closeup.jpg"
            alt="Close-up of vinyl grooves"
          />
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-text">
          <h3>What We Stand For</h3>
          <p>
            We believe music deserves a physical format. Vinyl forces you to
            slow down, listen to a full side, appreciate the artwork, and hold
            something real. In a world of infinite streaming, that matters.
          </p>
          <p>
            Our focus is on condition, press quality, and fair pricing. Every
            record is visually graded and play-tested before it reaches the
            catalogue. No surprises when the needle drops.
          </p>
        </div>
        <div className="about-img-single">
          <img
            src="/images/about-turntable.jpg"
            alt="Turntable playing a record"
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h3>The Collection</h3>
          <p>
            Our catalogue focus on electronic but you can find selected gems
            from other genres: including classic rock, jazz, hip-hop, and
            everything in between. We source internationally with a focus on
            original and audiophile pressings.
          </p>
          <p>
            Browse the full catalogue here on the site, or find us on Discogs
            where we manage and sync our inventory in real time.
          </p>
        </div>
        <div className="about-img-row three">
          <img src="/images/about-genres-1.jpg" alt="Assorted vinyl records" />
          <img
            src="/images/about-genres-2.jpg"
            alt="Record sleeves on display"
          />
          <img
            src="/images/about-genres-3.jpg"
            alt="Records organised by genre"
          />
        </div>
      </section>

      <section className="about-cta">
        <p>Have a question or want to propose a trade?</p>
        <a
          href="https://www.discogs.com/user/disqueria_what"
          target="_blank"
          rel="noopener noreferrer"
          className="about-cta-btn"
        >
          Find us on Discogs
        </a>
      </section>
    </div>
  );
}

export default About;
