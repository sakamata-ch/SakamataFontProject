import { Navigation, Theme } from '@canonical/react-components'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';

export default function Nav(): JSX.Element {

  const { t } = useTranslation();
  const { language } = useI18next();

  return (
    <div>
      <Navigation
        items={[
          {
            label: t('Supported Characters'),
            items: [
              {
                label: t('Alphabet, Number, ASCII Character'),
                url: `/${language}/ascii`
              },
              {
                label: t('Hiragana, Katakana'),
                url: `/${language}/hiragana-katakana`
              },
              {
                label: t('All Characters'),
                url: `/${language}/all-chars`
              }
            ]
          },
          {
            label: t('Downloads'),
            items: [
              {
                label: t('Release'),
                url: 'https://github.com/sakamata-ch/SakamataFontProject/releases/latest'
              },
              {
                label: t('Nightly'),
                url: 'https://github.com/sakamata-ch/SakamataFontProject/releases'
              }
            ]
          }
        ]}
        logo={{
          src: "/favicon.svg",
          title: t('Sakamata Font Project'),
          url: `/${language}/`
        }}
        theme={Theme.DARK}
      />
    </div>
  )
}