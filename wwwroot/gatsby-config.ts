import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Sakamata Font Project`,
    siteUrl: `https://font.sakamata.ch`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass", /* {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": ""
    }
  }, */ "gatsby-plugin-sitemap", "gatsby-plugin-sass", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.svg"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`ja`, `en`],
        defaultLanguage: `ja`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: `https://font.sakamata.ch`,
        // if you are using trailingSlash gatsby config include it here, as well (the default is 'always')
        trailingSlash: 'always',
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          /*{
            matchPath: '/:lang?/',
            getLanguageFromPath: true,
            languages: ['en', 'ja']
          }*/
        ]
      }
    }
  ]
};

export default config;
