import Header from "@/components/chutcha/Header";
import styles from "@/app/site.module.css";

type SitePageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function SitePageLayout({ title, description, children }: SitePageLayoutProps) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.desc}>{description}</p>}
        {children}
      </main>
    </div>
  );
}
