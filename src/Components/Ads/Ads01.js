import React from 'react';


export default class Ads extends React.Component {
  componentDidMount () {
    
    (window.adsbygoogle = window.adsbygoogle || []).push({});
     
  }

render () {
    return (
        <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5790649900681714"
        data-ad-slot="5746098113"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    );
  }
}