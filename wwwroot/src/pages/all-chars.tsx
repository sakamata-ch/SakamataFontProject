import { Card, Row, Col, Strip } from '@canonical/react-components'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import SupportTable from '../components/SupportTable';
import React from 'react';
import { Link, Trans, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import '../styles/vanilla.scss';
import { graphql } from 'gatsby'

export default function Home() {
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
      <title><Trans>Supported Characters</Trans> - <Trans>Sakamata Font Project</Trans></title>

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
