# jQuery Bootstrap-style Dropdowns #

Copyright 2011 Cory LaViska for [A Beautiful Site, LLC.](http://abeautifulsite.net/)

Inspired by [Bootstrap](http://twitter.github.com/bootstrap/javascript.html#dropdowns)

Dual licensed under the MIT or GPL Version 2 licenses

## Demo ##

http://http://labs.abeautifulsite.net/jquery-dropdown/

## Usage ##

1. Include required files:

  &lt;link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; src=&quot;jquery.dropdown.css&quot; /&gt;
  &lt;script type=&quot;text/javascript&quot; src=&quot;jquery.dropdown.js&quot;&gt;&lt;/script&gt;

2. Create a dropdown and insert it before the closing body tag:

  &lt;div <span class="highlight">id=&quot;dropdown-1&quot; class=&quot;dropdown-menu has-tip&quot;</span>&gt;
      &lt;ul&gt;
          &lt;li&gt;&lt;a href=&quot;#1&quot;&gt;Item 1&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href=&quot;#2&quot;&gt;Item 2&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href=&quot;#3&quot;&gt;Item 3&lt;/a&gt;&lt;/li&gt;
          &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href=&quot;#4&quot;&gt;Item 4&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href=&quot;#5&quot;&gt;Item 5&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href=&quot;#5&quot;&gt;Item 6&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
  &lt;/div&gt;

3. Add the `data-dropdown` attribute to any HTML element:

  &lt;a href=&quot;#&quot; <span class="highlight">data-dropdown=&quot;#dropdown-1&quot;</span>&gt;dropdown&lt;/a&gt;

4. There’s no need to initialize it! The plugin will handle everything from here.

## API ##

You probably won’t need these, but they’re there just in case.

`attach` – attach a dropdown to the selected trigger element(s); pass in the #dropdown-id as value
`detach` – detach a dropdown from the selected trigger element(s)
`enable` – enables the dropdown and removes the dropdown-disabled class from the trigger
`disable` – disables the dropdown and adds the dropdown-disabled class to the trigger
`hide` – hide the dropdown

Example usage: `$('#trigger').dropdown('method', [value]);`