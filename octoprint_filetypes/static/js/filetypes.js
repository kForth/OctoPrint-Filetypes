/*
 * View model for OctoPrint-Filetypes
 *
 * Author: thelongrunsmoke
 * License: AGPLv3
 */
$(function() {

    alert("Filetypes.js loaded");
    $('#gcode_upload').attr('accept', ".stl");

    function FiletypesViewModel(parameters) {
        var self = this;

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];

        // TODO: Implement your plugin's view model here.
    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        FiletypesViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        [ /* "loginStateViewModel", "settingsViewModel" */ ],

        // e.g. #settings_plugin_filetypes, #tab_plugin_filetypes, ...
        [ /* ... */ ]
    ]);
});
