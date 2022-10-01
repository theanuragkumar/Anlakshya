import React from 'react';

export default class InarticleAds extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins class="adsbygoogle"
        style={{display:"block",textAlign:"center"}}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-5790649900681714"
        data-ad-slot="9266540725"></ins>

    );
  }
}