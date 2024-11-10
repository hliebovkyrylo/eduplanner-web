import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className={styles.authLayout}>
      <section className={styles.authLayoutContent}>{children}</section>
    </main>
  );
};
