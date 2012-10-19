# jQuery Bootstrap-style Dropdowns #

Copyright 2011 Cory LaViska for [A Beautiful Site, LLC.](http://abeautifulsite.net/)

Inspired by [Bootstrap](http://twitter.github.com/bootstrap/javascript.html#dropdowns)

Dual licensed under the MIT or GPL Version 2 licenses

## Demo ##

http://labs.abeautifulsite.net/jquery-dropdown/

## Usage ##

* Include required files:

```html
<link type="text/css" rel="stylesheet" href="jquery.dropdown.css" />`
<script type="text/javascript" src="jquery.dropdown.js"></script>`
```

* Create a dropdown and insert it before the closing body tag:

```html
<div id="dropdown-1" class="dropdown-menu has-tip">
    <ul>
        <li><a href="#1">Item 1</a></li>
        <li><a href="#2">Item 2</a></li>
        <li><a href="#3">Item 3</a></li>
        <li class="divider"></li>
        <li><a href="#4">Item 4</a></li>
        <li><a href="#5">Item 5</a></li>
        <li><a href="#5">Item 6</a></li>
    </ul>
</div>
```

* Add the `data-dropdown` attribute to any HTML element:

```html
<a href="#" data-dropdown="#dropdown-1">dropdown</a>
```

* There’s no need to initialize it! The plugin will handle everything from here.

## Options ##

The following option attributes can be added to trigger element to override the plugin's default behvior.

`data-dropdown-h-offset` – add/subtract pixels from the default horizontal position of the menu.

`data-dropdown-v-offset` – add/subtract pixels from the default vertical position of the menu.

Example usage:

```html
<a href="#" data-dropdown="#dropdown-1" data-dropdown-h-offset="3" data-dropdown-v-offset="-5">dropdown</a>
```

...to move the menu up 5 and left 3 pixels.

## API ##

You probably won’t need these, but they’re there just in case.

`attach` – attach a dropdown to the selected trigger element(s); pass in the #dropdown-id as value

`detach` – detach a dropdown from the selected trigger element(s)

`enable` – enables the dropdown and removes the dropdown-disabled class from the trigger

`disable` – disables the dropdown and adds the dropdown-disabled class to the trigger

`hide` – hide the dropdown

Example usage: `$('#trigger').dropdown('method', [value]);`