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

const data: string[][][][] = [
  [
    [
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    ]
  ],
  [
    [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y", "Z"],
    ]
    ,
    [
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
      ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
      ["u", "v", "w", "x", "y", "z"],
    ]
  ],
  [
    [
      ["!", "”", "#", "$", "%", "&", "\'", "(", ")", "＊"],
      ["+", ",", "-", ".", "／", "：", ";", "＜", "=", "＞"],
      ["？", "@", "[", "＼", "]", "^", "_", "`", "{", "｜"],
      ["}", "~"]
    ]
  ]
];

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
      <Helmet title={t('Alphabet, Number, ASCII Chars Supported List') + ' - ' + t('Sakamata Font Project')}>
        <meta property="twitter:title" content={t('Alphabet, Number, ASCII Chars Supported List') + ' - ' + t('Sakamata Font Project')} />
        <meta property="og:title" content={t('Alphabet, Number, ASCII Chars Supported List') + ' - ' + t('Sakamata Font Project')} />
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
            <h1><Trans>Alphabet, Number, ASCII Chars Supported List</Trans></h1>
          </div>
        </div>
      </section>

      <Strip type="light" bordered>
        <h2><Trans>Number</Trans></h2>

        <SupportTable table={data[0][0]} chars={chars} />
      </Strip>


      <Strip type="light" bordered>
        <h2><Trans>Alphabet</Trans></h2>

        <SupportTable table={data[1][0]} chars={chars} />
        <SupportTable table={data[1][1]} chars={chars} />
      </Strip>


      <Strip type="light" bordered>
        <h2><Trans>Special Characters</Trans></h2>

        <SupportTable table={data[2][0]} chars={chars} />
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
