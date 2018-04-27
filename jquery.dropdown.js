/*
 * jQuery Dropdown: A simple dropdown plugin
 *
 * Contribute: https://github.com/claviska/jquery-dropdown
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 *
 */
if (jQuery) (function ($) {

    $.extend($.fn, {
        jqDropdown: function (method, data) {

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
            jqDropdown = $(trigger.attr('data-jq-dropdown'));

        // In some cases we don't want to show it
        if (event) {
            if ($(event.target).hasClass('jq-dropdown-ignore')) return;

            event.preventDefault();
            event.stopPropagation();
        } else {
            if (trigger !== object.target && $(object.target).hasClass('jq-dropdown-ignore')) return;
        }
        
        // Mark parent jq-dropdown-open classes to be kept
        var dropdownParents = $(event.target).parents();
        var maxParent = 0;
        for (var i = 0; i < dropdownParents.length; i++) {
            var check = $(dropdownParents[i]).attr('jq-dropdown-menu-order')
            if (check != null && parseInt(check) > maxParent) {
                maxParent = parseInt(check);
            }
        }
        
        // hide all the menus that are a child of the parent
        var hideEvent = jQuery.Event('hide', {'childrenMenusOf' : maxParent });
        jQuery('body').trigger(hideEvent);
        
        hide(hideEvent);

        if (trigger.hasClass('jq-dropdown-disabled')) return;

        // Show it
        trigger.addClass('jq-dropdown-open');
        trigger.addClass('jq-dropdown-open');
        trigger.attr('jq-dropdown-menu-order', (maxParent + 1));
        jqDropdown
            .attr('jq-dropdown-menu-order', (maxParent + 1))
            .data('jq-dropdown-trigger', trigger)
            .show();

        // Position it
        position((maxParent + 1));

        // Trigger the show callback
        jqDropdown
            .trigger('show', {
                jqDropdown: jqDropdown,
                trigger: trigger
            });
    }

    function hide(event) {

        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;
        var parentMenu = null;
        if (event.hasOwnProperty('childrenMenusOf')) {
            parentMenu = event.childrenMenusOf;
        }

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
        
        // If the dropdown is a child of another dropdown and the parent dropdown is marked to stay open
        if (parentMenu == null) {
            var parentToKeep = targetGroup.filter('.jq-dropdown-keep-parent-menu');
            if (parentToKeep[0] != null) {
                parentMenu = parseInt($(parentToKeep[0]).attr('jq-dropdown-menu-order'));
            }
        }

        // Trigger the event early, so that it might be prevented on the visible popups
        var hideEvent = jQuery.Event("hide", {'childrenMenusOf' : parentMenu });

        $(document).find('.jq-dropdown:visible').each(function () {
            var jqDropdown = $(this);
            if (parentMenu == null || parseInt(jqDropdown.attr('jq-dropdown-menu-order')) > parentMenu) {
                jqDropdown
                    .hide()
                    .removeData('jq-dropdown-trigger')
               .removeAttr('jq-dropdown-menu-order')
                    .trigger('hide', { jqDropdown: jqDropdown, 'childrenMenusOf': parentMenu });
            }
        });

        if(!hideEvent.isDefaultPrevented()) {
            // Hide any jq-dropdown that may be showing
            $(document).find('.jq-dropdown:visible').each(function () {
                var jqDropdown = $(this);
                if (parentMenu == null || parseInt(jqDropdown.attr('jq-dropdown-menu-order')) > parentMenu) {
                    jqDropdown
                        .hide()
                        .removeData('jq-dropdown-trigger')
                        .trigger('hide', { jqDropdown: jqDropdown, 'childrenMenusOf': parentMenu });
                }
            });
            
            // Remove all jq-dropdown-open classes and jq-dropdown-menu-order attributes
            $(document).find('.jq-dropdown-open').each(function () {
                var jqTrigger = $(this);
                if (parentMenu == null || parseInt(jqTrigger.attr('jq-dropdown-menu-order')) > parentMenu) {
                    jqTrigger
                        .removeAttr('jq-dropdown-menu-order')
                        .removeClass('jq-dropdown-open');
                }
            });
        }
    }

    function position(childMenu) {
        var jqDropdown = $("[jq-dropdown-menu-order=" + childMenu + "]").filter(".jq-dropdown"),
            trigger = jqDropdown.data('jq-dropdown-trigger'),
            hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
            vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;

        if (jqDropdown.length === 0 || !trigger) return;

        // Position the jq-dropdown relative-to-parent...
        if (jqDropdown.hasClass('jq-dropdown-relative')) {
            jqDropdown.css({
                left: jqDropdown.hasClass('jq-dropdown-anchor-right') ?
                    trigger.position().left - (jqDropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
                    trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
            });
        } else {
            // ...or relative to document
            jqDropdown.css({
                left: jqDropdown.hasClass('jq-dropdown-anchor-right') ?
                    trigger.offset().left - (jqDropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
                top: trigger.offset().top + trigger.outerHeight() + vOffset
            });
        }
    }

    $(document).on('click.jq-dropdown', '[data-jq-dropdown]', show);
    $(document).on('click.jq-dropdown', hide);
    $(window).on('resize', position);

})(jQuery);
