# jQuery Bootstrap-style Dropdowns #

Copyright [A Beautiful Site, LLC.](http://abeautifulsite.net/)

Licensed under the MIT license: http://opensource.org/licenses/MIT

## Demo & Documentation ##
http://labs.abeautifulsite.net/jquery-dropdown/

## Usage
Add the `<script>` and `<link>` reference for the jQuery dropdown JavaScript and CSS to your HTML:
```html
	<link type="text/css" rel="stylesheet" href="content/jquery.dropdown.css" />
	...

	<script type="text/javascript" src="scripts/jquery.dropdown.js"></script>
	...
```

Then add to your HTML two elements:
- The element under which the dropdown should show with a `data-jq-dropdown` attribute that points to the anchor/id. 
- The content of the dropdown in a div with a unique ide that is pointed to.

The dropdown div can be put anywhere on the page, for instance at the bottom just above the closing `</body>` tag (since it can be loaded last on the page, as it won't be shown to the user initially).

```html
<a href="#" data-jq-dropdown="#dropdown-1">dropdown</a>

...

<div id="dropdown-1" class="jq-dropdown jq-dropdown-tip jq-dropdown-anchor-right">
	<div class="jq-dropdown-panel">
		Here is some <code>HTML</code> inside of a dropdown. You can put pretty much <b>anything</b> inside of a dropdown, so have fun with it!
	</div>
</div>
```

## jQuery Bootstrap-style Dropdowns #
Forked on 2014-12-1 from @claviska original repo and changed name of css classes to prevent style clashes with Bootstrap 3 `dropdown` class.
Note that this forked repo might not be as actively developed, so refer to the original in that case.