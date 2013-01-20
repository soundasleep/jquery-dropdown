/*
 * jQuery dropdown: A simple dropdown plugin
 *
 * Inspired by Bootstrap: http://twitter.github.com/bootstrap/javascript.html#dropdowns
 *
 * Copyright 2011 Cory LaViska for A Beautiful Site, LLC. (http://abeautifulsite.net/)
 *
 * Dual licensed under the MIT or GPL Version 2 licenses
 *
*/
if(jQuery) (function($) {
	
	$.extend($.fn, {
		dropdown: function(method, data) {
			
			switch( method ) {
				case 'hide':
					hideDropdowns();
					return $(this);
				case 'attach':
					return $(this).attr('data-dropdown', data);
				case 'detach':
					hideDropdowns();
					return $(this).removeAttr('data-dropdown');
				case 'disable':
					return $(this).addClass('dropdown-disabled');
				case 'enable':
					hideDropdowns();
					return $(this).removeClass('dropdown-disabled');
			}
			
		}
	});
	
	function showMenu(event) {
		
		var trigger = $(this),
			dropdown = $( $(this).attr('data-dropdown') ),
			isOpen = trigger.hasClass('dropdown-open'),
                        isCached = trigger.attr('data-cached'),
                        dataSrc = trigger.attr('data-src'),
			hOffset = parseInt($(this).attr('data-horizontal-offset') || 0),
			vOffset = parseInt($(this).attr('data-vertical-offset') || 0);
		
		if( trigger !== event.target && $(event.target).hasClass('dropdown-ignore') ) return;
		
		event.preventDefault();
		event.stopPropagation();
		
		hideDropdowns();
		
		if( isOpen || trigger.hasClass('dropdown-disabled') ) return;

		if (dataSrc && ! isCached) {
                    dropdown.addClass('has-loader');
                    $.ajaxSetup({cache: false});
                    $.getJSON(dataSrc, function(data) {
                        var ul = $(document.createElement('ul'));
                        $.each(data, function(key, value) {
                            ul.append('<li><a href="'+value.href+'">'+value.text+'</a></li>');
                        });
                        dropdown.removeClass('has-loader').append(ul);
                        
                        trigger.attr('data-cached', true);
                    });
                }
		
		// Disable window.resize handler for old IE (window.resize bug)
		$(window).off('resize.dropdown');
		
		dropdown
			.css({
				left: dropdown.hasClass('anchor-right') ? 
					trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
				top: trigger.offset().top + trigger.outerHeight() + vOffset
			})
			.show();
		
		trigger.addClass('dropdown-open');
		
		// Re-enable window.resize handler for old IE (window.resize bug)
		setTimeout( function() {
			$(window).on('resize.dropdown', hideDropdowns);
		}, 1);
		
	};
	
	function hideDropdowns(event) {
		
		var targetGroup = event ? $(event.target).parents().andSelf() : null;
		if( targetGroup && targetGroup.is('.dropdown-menu') && !targetGroup.is('A') ) return;
		
		$('BODY')
			.find('.dropdown-menu').hide().end()
			.find('[data-dropdown]').removeClass('dropdown-open');
		
	};
	
	$(function() {
		$('BODY').on('click.dropdown', '[data-dropdown]', showMenu);
		$('HTML').on('click.dropdown', hideDropdowns);
	});
	
})(jQuery);