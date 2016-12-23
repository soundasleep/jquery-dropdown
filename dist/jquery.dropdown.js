/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * jQuery Dropdown: A simple dropdown plugin
	 *
	 * Contribute: https://github.com/claviska/jquery-dropdown
	 *
	 * @license: MIT license: http://opensource.org/licenses/MIT
	 *
	 */
	__webpack_require__(1);
	if (jQuery) (function ($) {

	    $.extend($.fn, {
	        jqDropdown: function jqDropdown(method, data) {

	            switch (method) {
	                case 'show':
	                    show(null, $(this));
	                    return $(this);
	                case 'hide':
	                    hide();
	                    return $(this);
	                case 'attach':
	                    return $(this).attr('data-jq-dropdown', data);
	                case 'detach':
	                    hide();
	                    return $(this).removeAttr('data-jq-dropdown');
	                case 'disable':
	                    return $(this).addClass('jq-dropdown-disabled');
	                case 'enable':
	                    hide();
	                    return $(this).removeClass('jq-dropdown-disabled');
	            }
	        }
	    });

	    function show(event, object) {

	        var trigger = event ? $(this) : object,
	            jqDropdown = $(trigger.attr('data-jq-dropdown')),
	            isOpen = trigger.hasClass('jq-dropdown-open');

	        // In some cases we don't want to show it
	        if (event) {
	            if ($(event.target).hasClass('jq-dropdown-ignore')) return;

	            event.preventDefault();
	            event.stopPropagation();
	        } else {
	            if (trigger !== object.target && $(object.target).hasClass('jq-dropdown-ignore')) return;
	        }
	        hide();

	        if (isOpen || trigger.hasClass('jq-dropdown-disabled')) return;

	        // Show it
	        trigger.addClass('jq-dropdown-open');
	        jqDropdown.data('jq-dropdown-trigger', trigger).show();

	        // Position it
	        position();

	        // Trigger the show callback
	        jqDropdown.trigger('show', {
	            jqDropdown: jqDropdown,
	            trigger: trigger
	        });
	    }

	    function hide(event) {

	        // In some cases we don't hide them
	        var targetGroup = event ? $(event.target).parents().addBack() : null;

	        // Are we clicking anywhere in a jq-dropdown?
	        if (targetGroup && targetGroup.is('.jq-dropdown')) {
	            // Is it a jq-dropdown menu?
	            if (targetGroup.is('.jq-dropdown-menu')) {
	                // Did we click on an option? If so close it.
	                if (!targetGroup.is('A')) return;
	            } else {
	                // Nope, it's a panel. Leave it open.
	                return;
	            }
	        }

	        // Hide any jq-dropdown that may be showing
	        $(document).find('.jq-dropdown:visible').each(function () {
	            var jqDropdown = $(this);
	            jqDropdown.hide().removeData('jq-dropdown-trigger').trigger('hide', { jqDropdown: jqDropdown });
	        });

	        // Remove all jq-dropdown-open classes
	        $(document).find('.jq-dropdown-open').removeClass('jq-dropdown-open');
	    }

	    function position() {

	        var jqDropdown = $('.jq-dropdown:visible').eq(0),
	            trigger = jqDropdown.data('jq-dropdown-trigger'),
	            hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
	            vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;

	        if (jqDropdown.length === 0 || !trigger) return;

	        // Position the jq-dropdown relative-to-parent...
	        if (jqDropdown.hasClass('jq-dropdown-relative')) {
	            jqDropdown.css({
	                left: jqDropdown.hasClass('jq-dropdown-anchor-right') ? trigger.position().left - (jqDropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset : trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
	                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
	            });
	        } else {
	            // ...or relative to document
	            jqDropdown.css({
	                left: jqDropdown.hasClass('jq-dropdown-anchor-right') ? trigger.offset().left - (jqDropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
	                top: trigger.offset().top + trigger.outerHeight() + vOffset
	            });
	        }
	    }

	    $(document).on('click.jq-dropdown', '[data-jq-dropdown]', show);
	    $(document).on('click.jq-dropdown', hide);
	    $(window).on('resize', position);
	})(jQuery);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./jquery.dropdown.sass", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./jquery.dropdown.sass");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*\n * jQuery Dropdown: A simple dropdown plugin\n *\n * Contribute: https://github.com/claviska/jquery-dropdown\n *\n * @license: MIT license: http://opensource.org/licenses/MIT\n *\n */\n.jq-dropdown {\n  position: absolute;\n  z-index: 1039;\n  display: none; }\n  .jq-dropdown .jq-dropdown-menu,\n  .jq-dropdown .jq-dropdown-panel {\n    min-width: 160px;\n    max-width: 360px;\n    list-style: none;\n    background: white;\n    border: solid 1px #ddd;\n    border-radius: 4px;\n    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n    overflow: visible;\n    padding: 4px 0;\n    margin: 0; }\n  .jq-dropdown .jq-dropdown-panel {\n    padding: 10px; }\n  .jq-dropdown.jq-dropdown-tip {\n    margin-top: 8px; }\n    .jq-dropdown.jq-dropdown-tip:before {\n      position: absolute;\n      top: -6px;\n      left: 9px;\n      content: '';\n      border-left: 7px solid transparent;\n      border-right: 7px solid transparent;\n      border-bottom: 7px solid #ddd;\n      display: inline-block; }\n    .jq-dropdown.jq-dropdown-tip:after {\n      position: absolute;\n      top: -5px;\n      left: 10px;\n      content: '';\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-bottom: 6px solid white;\n      display: inline-block; }\n    .jq-dropdown.jq-dropdown-tip.jq-dropdown-anchor-right:before {\n      left: auto;\n      right: 9px; }\n    .jq-dropdown.jq-dropdown-tip.jq-dropdown-anchor-right:after {\n      left: auto;\n      right: 10px; }\n  .jq-dropdown.jq-dropdown-scroll .jq-dropdown-menu,\n  .jq-dropdown.jq-dropdown-scroll .jq-dropdown-panel {\n    max-height: 180px;\n    overflow: auto; }\n  .jq-dropdown .jq-dropdown-menu li {\n    list-style: none;\n    padding: 0 0;\n    text-indent: 0;\n    margin: 0;\n    line-height: 18px; }\n  .jq-dropdown .jq-dropdown-menu li > a,\n  .jq-dropdown .jq-dropdown-menu label {\n    display: block;\n    color: inherit;\n    text-decoration: none;\n    line-height: 18px;\n    padding: 3px 15px;\n    margin: 0;\n    white-space: nowrap; }\n    .jq-dropdown .jq-dropdown-menu li > a:hover,\n    .jq-dropdown .jq-dropdown-menu label:hover {\n      background-color: #f2f2f2;\n      color: inherit;\n      cursor: pointer; }\n  .jq-dropdown .jq-dropdown-menu .jq-dropdown-divider {\n    font-size: 1px;\n    border-top: solid 1px #e5e5e5;\n    padding: 0;\n    margin: 5px 0; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);