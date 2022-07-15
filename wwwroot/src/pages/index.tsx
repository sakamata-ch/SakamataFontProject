import { Card, Row, Col, Strip } from '@canonical/react-components'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import React, { useEffect, useState } from 'react';
import { Link, Trans, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import '../styles/vanilla.scss';
import '../styles/sakamata-font.scss';
import '../styles/sakamata-font-preview.scss';
import { graphql } from 'gatsby'

export default function Home() {
  const { t } = useTranslation();
  const { languages, changeLanguage } = useI18next();

  const [textInput, setTextInput] = useState<string>(t('Sakamata Chloe'));

  return (
    <div>
      <title><Trans>Sakamata Font Project</Trans></title>

      <Nav />

      <section className="p-strip--suru">
        <div className="row u-vertically-center">
          <div className="col-8">
            <h1><Trans>Sakamata Font Project</Trans></h1>
            <p><Trans>Sakamata Font Project makes easy to use Sakamata Chloe's cute hand write Characters on yout computer.</Trans></p>
            <p><Trans>In personal purpose, you can use anywhere that accept custom ttf.</Trans></p>
          </div>
        </div>
      </section>

      <Strip type="light">
        <Row>
          <Col size={12}>
            <h2><Trans>Try it</Trans></h2>
            <p>
              <Trans>Try font now to check out Sakamata's cute hand write Characters.</Trans>
            </p>
            <input type="text" onChange={event => setTextInput(event.target.value)} defaultValue={textInput} />
            <div className="font-sakamata">
              {textInput}
            </div>
          </Col>
        </Row>
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