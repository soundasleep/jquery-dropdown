/*
 * jQuery dropdown: A simple dropdown plugin
 *
 * Inspired by Bootstrap: http://twitter.github.com/bootstrap/javascript.html#dropdowns
 *
 * Copyright 2013 Cory LaViska for A Beautiful Site, LLC. (http://abeautifulsite.net/)
 *
 * Dual licensed under the MIT / GPL Version 2 licenses
 *
*/
if(jQuery) (function($) {
	
	$.extend($.fn, {
		dropdown: function(method, data) {
			
			switch( method ) {
				case 'hide':
					hide();
					return $(this);
				case 'attach':
					return $(this).attr('jdata-dropdown', data);
				case 'detach':
					hide();
					return $(this).removeAttr('jdata-dropdown');
				case 'disable':
					return $(this).addClass('jdropdown-disabled');
				case 'enable':
					hide();
					return $(this).removeClass('jdropdown-disabled');
			}
			
		}
	});
	
	function show(event) {
		
		var trigger = $(this),
			dropdown = $(trigger.attr('jdata-dropdown')),
			isOpen = trigger.hasClass('jdropdown-open');
		
		// In some cases we don't want to show it
		if( $(event.target).hasClass('jdropdown-ignore') ) return;
		
		event.preventDefault();
		event.stopPropagation();
		hide();
		
		if( isOpen || trigger.hasClass('jdropdown-disabled') ) return;
		
		// Show it
		trigger.addClass('jdropdown-open');
		dropdown
			.data('jdropdown-trigger', trigger)
			.show();
			
		// Position it
		position();
		
		// Trigger the show callback
		dropdown
			.trigger('show', {
				dropdown: dropdown,
				trigger: trigger
			});
		
	}
	
	function hide(event) {
		
		// In some cases we don't hide them
		var targetGroup = event ? $(event.target).parents().addBack() : null;
		
		// Are we clicking anywhere in a dropdown?
		if( targetGroup && targetGroup.is('.jdropdown') ) {
			// Is it a dropdown menu?
			if( targetGroup.is('.jdropdown-menu') ) {
				// Did we click on an option? If so close it.
				if( !targetGroup.is('A') ) return;
			} else {
				// Nope, it's a panel. Leave it open.
				return;
			}
		}
		
		// Hide any dropdown that may be showing
		$(document).find('.jdropdown:visible').each( function() {
			var dropdown = $(this);
			dropdown
				.hide()
				.removeData('jdropdown-trigger')
				.trigger('hide', { dropdown: dropdown });
		});
		
		// Remove all dropdown-open classes
		$(document).find('.jdropdown-open').removeClass('jdropdown-open');
		
	}
	
	function position() {
		
		var dropdown = $('.jdropdown:visible').eq(0),
			trigger = dropdown.data('jdropdown-trigger'),
			hOffset = trigger ? parseInt(trigger.attr('jdata-horizontal-offset') || 0, 10) : null,
			vOffset = trigger ? parseInt(trigger.attr('jdata-vertical-offset') || 0, 10) : null;
		
		if( dropdown.length === 0 || !trigger ) return;
		
		// Position the dropdown relative-to-parent...
		if( dropdown.hasClass('jdropdown-relative') ) {
			dropdown.css({
				left: dropdown.hasClass('jdropdown-anchor-right') ?
					trigger.position().left - (dropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right')) + hOffset :
					trigger.position().left + parseInt(trigger.css('margin-left')) + hOffset,
				top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top')) + vOffset
			});
		} else {
			// ...or relative to document
			dropdown.css({
				left: dropdown.hasClass('jdropdown-anchor-right') ? 
					trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
				top: trigger.offset().top + trigger.outerHeight() + vOffset
			});
		}
	}
	
	$(document).on('click.jdropdown', '[jdata-dropdown]', show);
	$(document).on('click.jdropdown', hide);
	$(window).on('resize', position);
	
})(jQuery);
