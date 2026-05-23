import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutDetailsScene.module.css";

export default function AboutDetailsScene() {
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate side panels on scroll
      gsap.fromTo(
        leftPanelRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: leftPanelRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        rightPanelRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      year: "2023",
      title: "Best Interactive Art Award",
      description: "Recognized for innovative digital installations",
    },
    {
      year: "2022",
      title: "Webby Award Winner",
      description: "Outstanding achievement in web development",
    },
    {
      year: "2021",
      title: "Awwwards Site of the Day",
      description: "For creative portfolio design",
    },
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Vue", "Three.js", "GSAP"] },
    { category: "Backend", items: ["Node.js", "Python", "GraphQL"] },
    { category: "Design", items: ["Figma", "Adobe Suite", "Blender"] },
  ];

  const experience = [
    {
      role: "Senior Creative Developer",
      company: "Digital Arts Studio",
      period: "2022 - Present",
    },
    {
      role: "Frontend Architect",
      company: "Creative Agency",
      period: "2019 - 2022",
    },
    { role: "UI/UX Developer", company: "Startup Labs", period: "2017 - 2019" },
  ];

  const education = [
    {
      degree: "MFA in Digital Media",
      school: "Rhode Island School of Design",
      year: "2017",
    },
    { degree: "BSc in Computer Science", school: "MIT", year: "2015" },
    { degree: "Certificate in 3D Animation", school: "Gnomon", year: "2014" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel} ref={leftPanelRef}>
        <div className={styles.section}>
          <h2>Achievements</h2>
          <div className={styles.timeline}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.year}>{achievement.year}</div>
                <div className={styles.content}>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillCategory}>
                <h3>{skill.category}</h3>
                <div className={styles.skillItems}>
                  {skill.items.map((item, i) => (
                    <span key={i} className={styles.skillTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel} ref={rightPanelRef}>
        <div className={styles.section}>
          <h2>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className={styles.period}>{exp.period}</div>
                <div className={styles.role}>{exp.role}</div>
                <div className={styles.company}>{exp.company}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Education</h2>
          <div className={styles.educationList}>
            {education.map((edu, index) => (
              <div key={index} className={styles.educationItem}>
                <div className={styles.degree}>{edu.degree}</div>
                <div className={styles.school}>{edu.school}</div>
                <div className={styles.year}>{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
