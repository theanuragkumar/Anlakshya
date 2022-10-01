import React from 'react';

export default class Ads01 extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5790649900681714"
        data-ad-slot="4025822337"
        data-ad-format="autorelaxed"
        ></ins>
    );
  }
}