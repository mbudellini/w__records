import "./About.css";

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-text">
          <h2>What is What?</h2>
          <p className="about-subtitle">
            Disqueria What? — a pop-up record shop with no fixed address.
          </p>
        </div>
        <div className="about-hero-img">
          <img
            src="/resources/img/disqueria.jpg"
            alt="Disqueria What? storefront or interior"
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h3>How It All Started</h3>
          <p>
            Disqueria What? was born from a simple idea: curate a selection of
            vinyl records that truly matter (that make you say "whaaat?").
            Started as a personal collection has grown into a travelling pop-up
            that brings records to the people — no fixed shop, just crates,
            good music, and the right vibe.
          </p>
          <p>
            Every record in our catalogue is hand-picked by me. I'm a DJ and
            digging through crates, estate sales, and private collections is one
            of my favourite hobbies. Sharing is caring to me, that's why as a DJ
            I choose to move also on record selling: is another way of share
            music and connect people.
          </p>
        </div>
        <div className="about-img-row">
          <img src="/resources/img/cratedig.PNG" alt="Crate digging" />
          <img
            src="/resources/img/crateshow.JPG"
            alt="Close-up of vinyl grooves"
          />
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-text">
          <h3>The Collection</h3>
          <p>
            The catalogue focus on electronic but you can find selected gems
            from other genres: including classic rock, jazz, hip-hop, and
            everything in between. I source internationally with a focus on
            original and audiophile pressings.
          </p>
          <p>
            Every record is visually graded and if something doesn't meet the
            standard, it doesn't go up for sale. Browse the full catalogue here
            on the site, or find me on Discogs where I manage and sync the
            inventory in real time.
          </p>
        </div>
        <div className="about-img-row three">
          <img src="/resources/img/burial.jpg" alt="Assorted vinyl records" />
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/resources/video/video_records.mp4"
          />
          <img
            src="/resources/img/bohm.JPG"
            alt="special relativity record"
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h3>Pop-Up Events</h3>
          <p>
            Disqueria What? doesn't have a permanent location — and that's the
            point. The collection travels, sets up for a day or a weekend, and
            then moves on. Each pop-up is different: a market stall, a club
            foyer, a record fair, a friend's courtyard.
          </p>
          <p>
            So far the crates have landed at{" "}
            <strong>Future Archives</strong> (twice), the{" "}
            <strong>Garage Sale at Borgo San Giovanni</strong>, and a few
            market events organised together with{" "}
            <strong>Provvisorio Clothing</strong>. Every pop-up is a chance to
            dig through the selection in person, have a chat, and walk away with
            something you didn't know you needed.
          </p>
        </div>
        <div className="about-img-row three">
          <img src="/resources/img/future_archives_1.JPG" alt="infographic future archives" />
          <img src="/resources/img/future_archives_2.JPG" alt="infographic future archives" />
          <img src="/resources/img/garage_sale.JPG" alt="infographic garage sale" />
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
          Contact me on Discogs
        </a>
      </section>
    </div>
  );
}

export default About;
