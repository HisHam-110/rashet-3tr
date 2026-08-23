import React from 'react';
import './AboutSection.css';
import aboutImg from '../../assets/images/About.svg';

export default function AboutSection() {
  return (
    <section className="about-section" id="about-brand">
      <div className="about-container">
        {/* Since the page is RTL, the first element (right side) is the Content,
            and the second element (left side) is the Image. */}
        <div className="about-content">
          <h2 className="about-title">عن رشة عطر.</h2>
          <div className="about-title-line"></div>
          
          <p className="about-paragraph">
            في رشة عطر، نؤمن أن العطر ليس مجرد رائحة، بل هو حضور يسبقك ويحكي عن شخصيتك. 
            نسعى لتقديم عطور فاخرة تترك أثراً يدوم، وجمالاً يعكس ذوقك وتميزك، 
            لنمنحك تجربة عطرية استثنائية تناسب كل لحظة.
          </p>

          <button className="about-btn" aria-label="اقرأ المزيد عن رشة عطر">
            اقرأ المزيد
          </button>
        </div>

        <div className="about-image-wrapper">
          <img 
            src={aboutImg} 
            alt="تشكيلة زجاجات عطور فاخرة من رشة عطر" 
            className="about-img" 
          />
        </div>
      </div>
    </section>
  );
}
