/*
 * View model for OctoPrint-Filetypes
 *
 * Author: thelongrunsmoke
 * License: AGPLv3
 */
$(function() {
    function FiletypesViewModel(parameters) {
        var self = this;
	self.settings = parameters[0];

	self.type = {
	    stl : ko.observable()
	};

	self.updateTypes = function(){
	    console.log("Filetypes updated");
	};

	self.type.stl.subscribe(self.updateTypes);

        self.onBeforeBinding = function() {
            console.log(self.settings.settings.plugins.filetypes)
            self.filetypes = self.settings.settings.plugins.filetypes;
	    self.type.stl(self.filetypes.stl);
	    var result = [];
	    if (self.type.stl) result.push(".stl");
	    if (self.filetypes.gcode()) result.push(".gcode");
	    if (self.filetypes.gco()) result.push(".gco");
            if (self.filetypes.g()) result.push(".g");
            $('#gcode_upload').attr('accept', result.join(','));	    	     
        }
	
    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        FiletypesViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        [ "settingsViewModel"],

        // e.g. #settings_plugin_filetypes, #tab_plugin_filetypes, ...
        [ "#settings_plugin_filetypes" ]
    ]);
});
