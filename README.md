# site-pdf

site-pdf is pdf generator from webpage to depend on phantom-node

## required
phantomjs

## install
```
npm install site-pdf
```

## example
```
let sitePDF = new SitePDF({
  cookie: {
    'name': 'COOKIE_KEY_NAME',
    'value': '100',
    'domain': 'stackoverflow.com',
    'path'     : '/',
    'expires'  : (new Date()).getTime() + (1000 * 60 * 60)
  },
  userAgent: "sitePDF",
  // viewportSize: {width: 1280, height: 800},
  paperSize: {
    format: "A4",
    orientation: "portrait",
    margin: {left:"0.5cm", right:"0.5cm", top:"0.5cm", bottom:"0.5cm"}
  },
  phantomArgs:[['--ignore-ssl-errors=true', '--disk-cache=true'], {
      // phantomPath: '/usr/local/bin/phantomjs',
      logLevel: 'info',
    }]
})

await sitePDF.create('http://stackoverflow.com/','output.pdf')

sitePDF.destroy()
```