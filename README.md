#Work in progress [Demo](#)

Some description about this plugin/extension

## Dependencies
* [jQuery](http://jquery.com)
* [Bootstrap 3](http://getbootstrap.com)

## Installation
### Via npm
```shell
npm install bootstrap-extra-modal
```

### Manually
[Download the project]() and include the sources inside your head tag.
Make sure you include the files **after** including jQuery and Bootstrap 3 sources

```html
<!-- jQuery src -->
<!-- Bootstrap 3 src -->

<link rel="stylesheet" type="text/css" href="your/folder/bootstrap-extra-modal.css">
<script src="your/folder/bootstrap-extra-modal.min.js" type="text/javascript"></script>
```

## How to use:
### Via data attributes
```html
<button data-em-selector="#fancyModal" data-em-position="left" data-em-push-content="true">Ignite!</button>
```

### Via JavaScript
```javascript
$('#fancyModal').bootstrapExtraModal(options).show();
```


## Run:
```shell
npm install
```
Then:

```shell
grunt watch
```
