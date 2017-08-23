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
	        stl : ko.observable(),
	        gcode : ko.observable(),
	        gco : ko.observable(),
	        g : ko.observable()
	    };

	   self.updateTypes = function(){
	        var keys = Object.keys(self.type);
	        var result = [];
	        keys.forEach(function(key){
	            if (self.type[key]()) result.push("."+key);
	        });
	        $('#gcode_upload').attr('accept', result.join(','));
	    };

        self.onBeforeBinding = function() {
            var keys = Object.keys(self.type);
            keys.forEach(function(key) {
                self.type[key](self.settings.settings.plugins.filetypes[key]());
            });
            keys.forEach(function(key) {
                self.type[key].subscribe(self.updateTypes);
            });
		self.updateTypes();		
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
