# Examples

## Example config

```javascript
grunt.initConfig({
  slim: {                              // Task
    dist: {                            // Target
      files: {                         // Dictionary of files
        'index.html': 'index.slim',     // 'destination': 'source'
        'sidebar.html': 'sidebar.slim'
      }
    },
    dev: {                             // Another target
      options: {                       // Target options
        style: 'expanded'
      },
      files: {
        'index.html': 'index.slim',
        'page.html': [
          'header.html',
          'body.html',
          'footer.html'  // Maybe you need one extra file in dev
        ]
      }
    }
  }
});

grunt.loadNpmTasks('grunt-slim');

grunt.registerTask('default', ['jshint', 'slim']);
```

## Compile

```javascript
grunt.initConfig({
  slim: {
    dist: {
      files: {
        'index.html': 'index.slim'
      }
    }
  }
});
```

## Concat and compile

If you specify an array of `src` paths they will be concatenated. However, in most cases you would want to just `render` them into `index.slim`.

```javascript
grunt.initConfig({
  slim: {
    dist: {
      files: {
      'index.html': [
          'header.html',
          'content.html'
        ]
      }
    }
  }
});
```

## Compile multiple files

You can specify multiple `destination: source` items in `files`.

```javascript
grunt.initConfig({
  slim: {
    dist: {
      files: {
        'index.css': 'index.slim',
        'sidebar.html': 'sidebar.slim'
      }
    }
  }
});
```
