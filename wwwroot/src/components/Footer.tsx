import { Strip, Icon, ICONS } from '@canonical/react-components'
import { Link } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';

export default function Footer(): JSX.Element {

  const { t } = useTranslation();

  return (
    <footer>
      <hr className="u-no-margin--bottom"></hr>
      <Strip type="light" className="u-no-margin--top">
        <p><Trans>This project working under Hololive Derivative Works Guidelines.</Trans></p>
        <p>
          <a href="https://github.com/sakamata-ch/SakamataFontProject" title="GitHub"><Icon name={ICONS.github}></Icon></a>
        </p>
      </Strip>
    </footer>
  )
}