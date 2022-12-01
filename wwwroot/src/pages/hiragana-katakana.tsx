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
      ["わ", "ら", "や", "ま", "は", "な", "た", "さ", "か", "あ"],
      ["", "り", "", "み", "ひ", "に", "ち", "し", "き", "い"],
      ["を", "る", "ゆ", "む", "ふ", "ぬ", "つ", "す", "く", "う"],
      ["", "れ", "", "め", "へ", "ね", "て", "せ", "け", "え"],
      ["ん", "ろ", "よ", "も", "ほ", "の", "と", "そ", "こ", "お"],
    ],
    [
      ["ぽ", "ば", "だ", "ざ", "が"],
      ["ぴ", "び", "ぢ", "じ", "ぎ"],
      ["ぷ", "ぶ", "づ", "ず", "ぐ"],
      ["ぺ", "べ", "で", "ぜ", "げ"],
      ["ぽ", "ぼ", "ど", "ぞ", "ご"],
    ],
    [
      ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',],
      ['っ', 'ゃ', 'ゅ', 'ょ', 'ゎ',],
    ],
  ],
  [
    [
      ["ワ", "ラ", "ヤ", "マ", "ハ", "ナ", "タ", "サ", "カ", "ア"],
      ["", "リ", "", "ミ", "ヒ", "ニ", "チ", "シ", "キ", "イ"],
      ["ヲ", "ル", "ユ", "ム", "フ", "ヌ", "ツ", "ス", "ク", "ウ"],
      ["", "レ", "", "メ", "ヘ", "ネ", "テ", "セ", "ケ", "エ"],
      ["ン", "ロ", "ヨ", "モ", "ホ", "ノ", "ト", "ソ", "コ", "オ"],
    ],
    [
      ["ポ", "バ", "ダ", "ザ", "ガ"],
      ["ピ", "ビ", "ヂ", "ジ", "ギ"],
      ["プ", "ブ", "ヅ", "ズ", "グ"],
      ["ペ", "ベ", "デ", "ゼ", "ゲ"],
      ["ポ", "ボ", "ド", "ゾ", "ゴ"],
    ],
    [
      ['ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ヵ'],
      ['ッ', 'ャ', 'ュ', 'ョ', 'ヮ'],
    ],
  ]
];

export default function Home() {
  const { t } = useTranslation();
  const { language, siteUrl } = useI18next();

  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://blob.sakamata.ch/font/char.tsv').then(res => res.text()).then(data => {
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
      <Helmet title={t('Hiragana, Katakana Supported List') + ' - ' + t('Sakamata Font Project')}>
        <meta property="twitter:title" content={t('Hiragana, Katakana Supported List') + ' - ' + t('Sakamata Font Project')} />
        <meta property="og:title" content={t('Hiragana, Katakana Supported List') + ' - ' + t('Sakamata Font Project')} />
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
            <h1><Trans>Hiragana, Katakana Supported List</Trans></h1>
          </div>
        </div>
      </section>

      <Strip type="light" bordered>
        <h2><Trans>Hiragana</Trans></h2>

        <SupportTable table={data[0][0]} chars={chars} />
        <SupportTable table={data[0][1]} chars={chars} />
        <SupportTable table={data[0][2]} chars={chars} />

      </Strip>

      <Strip type="light">
        <h2><Trans>Katakana</Trans></h2>

        <SupportTable table={data[1][0]} chars={chars} />
        <SupportTable table={data[1][1]} chars={chars} />
        <SupportTable table={data[1][2]} chars={chars} />

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
