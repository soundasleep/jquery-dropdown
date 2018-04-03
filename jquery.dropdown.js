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
        hide(event);

        if (isOpen || trigger.hasClass('jq-dropdown-disabled')) return;

        // Show it
        trigger.addClass('jq-dropdown-open');
        jqDropdown
            .data('jq-dropdown-trigger', trigger)
            .show();

        // Position it
        position();

        // Trigger the show callback
        jqDropdown
            .triggerHandler('show', {
                jqDropdown: jqDropdown,
                trigger: trigger
            });

    }

    function hide(event) {

        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;

        // hide other dropdowns, but not the one we've clicked within
        var toHide = $(document).find('.jq-dropdown:visible').not(
            $(event.target).parents('.jq-dropdown'));

        if (targetGroup && targetGroup.is('.jq-dropdown') &&
            targetGroup.is('.jq-dropdown-menu') &&
            targetGroup.is('A')) {
            // Clicked an option within the current dropdown
            // If this is a nested dropdown, make sure to keep the parent dropdown open
            toHide = $(event.target).closest('.jq-dropdown:visible')
        }

        // Trigger the event early, so that it might be prevented on the visible popups
        var hideEvent = jQuery.Event("hide");


        toHide.each(function () {
            var jqDropdown = $(this);
            jqDropdown
                .hide()
                .triggerHandler('hide', { jqDropdown: jqDropdown });
        });

        if(!hideEvent.isDefaultPrevented()) {
            // Hide any jq-dropdown that may be showing
            toHide.each(function () {
                // Remove all jq-dropdown-open classes
                var jqDropdown = $(this);
                var trigger = jqDropdown.data('jq-dropdown-trigger');
                trigger.removeClass('jq-dropdown-open');
                jqDropdown
                    .hide()
                    .removeData('jq-dropdown-trigger')
                    .triggerHandler('hide', { jqDropdown: jqDropdown });
            });
        }
    }

    function position() {
        $('.jq-dropdown:visible').each(function() {
            positionDropdown($(this));
         });
    }

    function positionDropdown(jqDropdown) {

        var trigger = jqDropdown.data('jq-dropdown-trigger');
        if (!trigger) {
            return;
        }

        var hOffset = parseInt(trigger.attr('data-horizontal-offset') || 0, 10),
            vOffset = parseInt(trigger.attr('data-vertical-offset') || 0, 10);

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
