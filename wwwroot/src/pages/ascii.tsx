import { Card, Row, Col, Strip } from '@canonical/react-components'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import SupportTable from '../components/SupportTable';
import React from 'react';
import { Link, Trans, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import '../styles/vanilla.scss';
import { graphql } from 'gatsby'

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
      <title><Trans>Alphabet, Number, ASCII Chars Supported List</Trans> - <Trans>Sakamata Font Project</Trans></title>

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
        <h2><Trans>Special Charactors</Trans></h2>

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
