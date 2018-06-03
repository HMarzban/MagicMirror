
        $.fn.md_lighting = function (options) {
            let defaults = { id: "" };
            let $settings = $.extend({}, defaults, options);
            if ($settings.id == "")
                throw new moduleError('ID is not defind', "lighting", ln().end, ln().start);
            const $this = this;
            const $lighting_module = modul_configList[$settings.id];

            //Put Your Module Code Here
            //If You Need More Info about Jquery Plugin You Can Visit link Below:
            //Tutorial Source:
            //          https://learn.jquery.com/plugins/
            //          https://learn.jquery.com/plugins/basic-plugin-creation/
            //          https://learn.jquery.com/plugins/advanced-plugin-concepts/
            //          https://learn.jquery.com/plugins/stateful-plugins-with-widget-factory/

        };// $.fn.md_lighting

        $(moduleBase.position + " ." + moduleBase.id).md_lighting({ id: moduleBase.id });
        