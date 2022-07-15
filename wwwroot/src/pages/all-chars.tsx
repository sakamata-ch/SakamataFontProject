import { Card, Row, Col, Strip } from '@canonical/react-components'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import SupportTable from '../components/SupportTable';
import React from 'react';
import { Link, Trans, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import '../styles/vanilla.scss';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet';

export default function Home() {
  const { t } = useTranslation();
  const { language, siteUrl } = useI18next();
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://font.sakamata.ch/char.tsv').then(res => res.text()).then(data => {
      let chars: string[] = [];

      String(data).split('\n').forEach(function (l: string) {
        if (l === '') return;
        const v = l.split('\t');
        chars[chars.length] = v[0];
      });

      setChars(chars);
    });
  }, []);

  return (
    <div>
      <Helmet title={t('Supported Characters') + ' - ' + t('Sakamata Font Project')}>
        <meta property="twitter:title" content={t('Supported Characters') + ' - ' + t('Sakamata Font Project')} />
        <meta property="og:title" content={t('Supported Characters') + ' - ' + t('Sakamata Font Project')} />
        <html lang={language}></html>
        <meta property='twitter:description' content={t("Sakamata Font Project makes easy to use Sakamata Chloe's cute hand write Characters on yout computer.")} />
        <meta name="description" content={t("Sakamata Font Project makes easy to use Sakamata Chloe's cute hand write Characters on yout computer.")} />
        <meta property="og:image" content="/favicon.svg" />
        <meta property="twitter:image" content="/favicon.svg" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={t('Sakamata Font Project')} />
      </Helmet>

      <Nav />

      <section className="p-strip--suru-topped">
        <div className="row u-vertically-center">
          <div className="col-8">
            <h1><Trans>Supported Characters</Trans></h1>
            <p>{chars.length} <Trans>characters supported now.</Trans></p>
          </div>
        </div>
      </section>

      <Strip type="light">
        <ul>
          {chars.map(i =>
            <li key={i}>{i}: <i className="font-sakamata-apply">{i}</i> (U+{i.charCodeAt(0).toString(16)})</li>
          )}
        </ul>
      </Strip>

      <Footer />

    </div >
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
