// pages/index.js

import Head from 'next/head';
import AsciiArtGenerator from './components/AsciiArtGenerator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ASCII Art Generator</title>
        <meta name="description" content="Generate ASCII art from images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>ASCII Art Generator</h1>
        <AsciiArtGenerator />
      </main>

      <footer>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}
