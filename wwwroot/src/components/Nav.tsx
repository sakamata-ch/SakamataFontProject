import { Navigation, Theme } from '@canonical/react-components'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';

export default function Nav(): JSX.Element {

  const { t } = useTranslation();

  return (
    <div>
      <Navigation
        items={[
          {
            label: t('Supported Characters'),
            items: [
              {
                label: t('Alphabet, Number, ASCII Character'),
                url: '/ascii'
              },
              {
                label: t('Hiragana, Katakana'),
                url: '/hiragana-katakana'
              },
              {
                label: t('All Characters'),
                url: '/all-chars'
              }
            ]
          },
          {
            label: t('Downloads'),
            items: [
              {
                label: t('Release'),
                url: 'https://github.com/sakamata-ch/SakamataFontProject/releases'
              },
              {
                label: t('Nightly'),
                url: 'https://github.com/sakamata-ch/SakamataFontProject/actions/workflows/generate-ttf.yml'
              }
            ]
          }
        ]}
        logo={{
          src: "/favicon.svg",
          title: t('Sakamata Font Project'),
          url: '/'
        }}
        theme={Theme.DARK}
      />
    </div>
  )
}