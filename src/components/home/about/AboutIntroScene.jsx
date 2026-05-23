import styles from "./AboutIntroScene.module.css";

export default function AboutIntroScene() {
  const socialLinks = [
    {
      platform: "Twitter",
      url: "https://twitter.com/benjamin",
      icon: "/assets/about/social/twitter.svg",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/benjamin",
      icon: "/assets/about/social/instagram.svg",
    },
    {
      platform: "GitHub",
      url: "https://github.com/benjamin",
      icon: "/assets/about/social/github.svg",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/benjamin",
      icon: "/assets/about/social/linkedin.svg",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.socialLinks}>
        {socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={social.platform}
          >
            <img src={social.icon} alt={social.platform} />
          </a>
        ))}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Benjamin Carter</h1>
        <p className={styles.subtitle}>Creative Developer & Digital Artist</p>
        <div className={styles.bio}>
          <p>
            Pushing the boundaries of interactive storytelling through code and
            creativity.
          </p>
        </div>
      </div>
    </div>
  );
}
