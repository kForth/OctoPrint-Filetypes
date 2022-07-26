/*
 * View model for OctoPrint-Filetypes
 *
 * Author: thelongrunsmoke
 * Modified by: Kestin Goforth
 * License: AGPLv3
 */
$(function() {
    function FiletypesViewModel(parameters) {
        var self = this;
        self.settings = parameters[0];
        
        self.defaultTypes = ko.observableArray([]);
        self.customTypes = ko.observableArray([]);

        self.addFiletype = function () {
            self.customTypes.push({
                extension: ko.observable(""),
                local: ko.observable(true),
                sd: ko.observable(false)
            });
        };

        self.removeFiletype = function (filetype) {
            self.customTypes.remove(filetype);
        };
        
        self.updateTypes = function() {
            var localTypes = [];
            var sdTypes = [];
            _.each(self.defaultTypes().concat(self.customTypes()), function(e){
                var ext = "." + e.extension();
                if(e.local() && localTypes.indexOf(ext) < 0)
                    localTypes.push(ext);
                if(e.sd() && sdTypes.indexOf(ext) < 0)
                    sdTypes.push(ext);
            });

            $('#gcode_upload').attr('accept', localTypes.join(','));
            $('#gcode_upload_sd').attr('accept', sdTypes.join(','));
        };
        
        self.onBeforeBinding = function() {
            self.defaultTypes(self.settings.settings.plugins.filetypes.defaultTypes());
            self.customTypes(self.settings.settings.plugins.filetypes.customTypes());

            self.updateTypes();
        };
        
        self.onSettingsBeforeSave = function() {
            self.updateTypes();
        };
    }

    OCTOPRINT_VIEWMODELS.push([
        FiletypesViewModel,
        [ "settingsViewModel"],
        [ "#settings_plugin_filetypes" ]
    ]);
});
