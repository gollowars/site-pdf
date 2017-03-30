# phantomPDF

phantomPDF is pdf generator from webpage to depend on phantom-node

## required
phantomjs

## install
```
npm install phantomPDF
```

## example
```
let phantomPDF = new PhantomPDF({
  cookie: {
    'name': 'COOKIE_KEY_NAME',
    'value': '100',
    'domain': 'stackoverflow.com',
    'path'     : '/',
    'expires'  : (new Date()).getTime() + (1000 * 60 * 60)
  },
  userAgent: "phantomPDF",
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

await phantomPDF.create('http://stackoverflow.com/','output.pdf')

phantomPDF.destroy()
```