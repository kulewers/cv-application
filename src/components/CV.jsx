import React from "react";
import "../styles/CV.css";

export default function CV({ generalInfo, eduExperiences }) {
  console.log(eduExperiences);
  return (
    <div className="cv">
      <header>
        <h1>{generalInfo?.name}</h1>
        <div className="contact">
          <p>{generalInfo?.email}</p>
          <p>{generalInfo?.tel}</p>
        </div>
      </header>

      <section className="education">
        <h1>Educational Experiences: </h1>
        {eduExperiences.map((experience) => {
          return (
            <div className="experience">
              <p className="degree">{experience.degree}</p>
              <p className="place">{experience.place}</p>
              <p className="start-date">Start Date: {experience.startDate}</p>
              <p className="end-date">End Date: {experience.endDate}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
