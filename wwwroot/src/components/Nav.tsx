import { Navigation, Theme } from '@canonical/react-components'
import { useTranslation, useI18next, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.scss'

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
              },
              {
                label: <><i className="bi bi-box-arrow-up-right"></i> <Trans>Source Contents</Trans></>,
                url: `/sakamata-v1.sources.tsv`
              }
            ]
          },
          {
            label: t('Downloads'),
            items: [
              {
                label: <><i className="bi bi-box-arrow-up-right"></i> <Trans>Release</Trans></>,
                url: 'https://github.com/sakamata-ch/SakamataFontProject/releases/latest'
              },
              {
                label: <><i className="bi bi-box-arrow-up-right"></i> <Trans>Nightly</Trans></>,
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