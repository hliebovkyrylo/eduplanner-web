import styles from "./AuthForm.module.scss";

interface AuthFormProps {
  subtitle: string;
  onSubmit: () => void;
  children: React.ReactNode;
  linkText: string;
  linkUrl: string;
  linkActionText: string;
}

export const AuthForm = ({
  subtitle,
  onSubmit,
  children,
  linkText,
  linkActionText,
  linkUrl,
}: AuthFormProps) => {
  return (
    <div className={styles.authForm}>
      <h2>EduPlanner</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
        <p className={styles.linkText}>
          {linkText}
          <a href={linkUrl} className={styles.linkActionText}>
            {linkActionText}
          </a>
        </p>
        <button className={styles.button} type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};
