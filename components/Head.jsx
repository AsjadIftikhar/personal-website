import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Asjad is an avid full stack web developer building websites and applications you'd love to use"
      />
      <meta
        name="keywords"
        content="web developer, django, react, generative AI portfolio, AWS"
      />
      <meta property="og:title" content="Asjad Iftikhars's Portfolio" />
      <meta
        property="og:description"
        content="A full-stack developer building websites that you'd like to use."
      />
      <meta property="og:image" content="https://drive.google.com/file/d/1_89AIol_yn0Jl4XFC4O56u-EyNqlJaAD/view?usp=sharing" />
      <meta property="og:url" content="https://asjadiftikhar.site/" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Nitin Ranganath',
};
