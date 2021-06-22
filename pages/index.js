import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>안녕하세요 aB 입니다. :)</p>
        <p>
          Next.js 공식 튜토리얼 입니다.
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>
        </p>
      </section>
    </Layout>
  );
}
