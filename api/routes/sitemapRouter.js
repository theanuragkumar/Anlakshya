const express = require("express"),
{ SitemapStream, streamToPromise} =require('sitemap'),
Post = require("../models/Post"),
date = new Date().toISOString(),
zlib = require("zlib"),
router = express.Router();

let sitemap;

router.get('/sitemap.xml', async function (req, res) {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
  
    // If we have a cached entry send it
    if (sitemap) return res.send(sitemap)
  
    try {
  
        // Fetching todo records and mapping
        // it the desired URL pattern
        const data = await Post.find(),
            posts = data.map(({ _id,title }) => `/post/${title.replace(/[^a-zA-Z0-9]+/ig, "-")}-${_id}`),
  
            // Base url of our site
            smStream = new SitemapStream({ 
                hostname: 'https://www.anlakshya.in/' }),
            pipeline = smStream.pipe(zlib.createGzip());
  
        // Write todo URL to the stream
        posts.forEach(
            item => smStream.write({
                url: item, lastmod: date,
                changefreq: 'daily', priority: 0.9
            }));
  
        // Manually add all the other important URLs
        smStream.write({
            url: '/about', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts/?cat=infosys', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts/?cat=tcs', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts/?cat=wipro', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts/?cat=capgemini', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts/?cat=Congnizant', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/post/?cat=interview', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        smStream.write({
            url: '/posts/?cat=project', lastmod: date,
            changefreq: 'monthly', priority: 0.9
        })
        // Cache the response
        streamToPromise(pipeline).then(sm => sitemap = sm);
        smStream.end()
  
        // Stream write the response
        pipeline.pipe(res).on('error', e => { throw e });
    } catch (err) {
        console.error(err)
        res.status(500).end()
    }
});
  
module.exports = router;