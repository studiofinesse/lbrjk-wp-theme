# LBRJK Theme Development

### Setup
Install dependencies using `npm i`

### Gulp Tasks

`gulp dev`: Will run development tasks and create a browserSync instance (see [browserSync](#browserSync) below) and watch for changes.  
`gulp build`: Will run development tasks and prepare files for production.  
`gulp package`: Will run build tasks and package production files in `__packaged` directory ready for upload.

### browserSync
The development task uses browserSync to automatically reload the browser after file changes.

1. Create a `browserSync.json` file in the theme root.
2. Configure the options in a json object, include the local url as the `proxy`.

Example:

```
{
	"proxy": "http://projectname.localhost",
	"open": false,
	"injectChanges": true,
	"watchEvents": [ "change", "add", "unlink", "addDir", "unlinkDir" ]
}
```

A full list of browserSync options can be found [here](https://www.browsersync.io/docs/options).