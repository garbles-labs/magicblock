import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import PlausibleProvider from 'next-plausible'

import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-rust')
require('prismjs/components/prism-toml')

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
  {
    links: [
      { title: '', href: '/' },
      { title: 'Hello World', href: '/docs/hello-world' },
    ],
  },
  {
    title: 'Contacts',
    links: [{ title: 'Reach us', href: '/docs/contact' }],
  },
]

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (/^h[23]$/.test(node.name)) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  return (
    <>
      <PlausibleProvider domain="magicblock.gg" trackOutboundLinks={true}>
        <Head>
          <title>{pageTitle}</title>
          {description && <meta name="description" content={description} />}

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content="https://www.magicblock.gg/logo.png"
          />
          <meta property="og:image:width" content="250" />
          <meta property="og:image:height" content="214" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={description} />
          <meta
            name="twitter:image"
            content="https://www.magicblock.gg/logo.png"
          />
        </Head>
        <Layout
          navigation={navigation}
          title={title}
          tableOfContents={tableOfContents}
        >
          <Component {...pageProps} />
        </Layout>
      </PlausibleProvider>
    </>
  )
}
