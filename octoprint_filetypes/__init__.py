# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class FiletypesPlugin(octoprint.plugin.StartupPlugin,
                      octoprint.plugin.TemplatePlugin,
                      octoprint.plugin.SettingsPlugin,
                      octoprint.plugin.AssetPlugin):

    ##~~ SettingsPlugin mixin
    def get_settings_defaults(self):
        return {
            "defaultTypes": [
                {'extension': 'stl', 'local': True, 'sd': False},
                {'extension': 'gcode', 'local': True, 'sd': True},
                {'extension': 'gco', 'local': True, 'sd': True},
                {'extension': 'g', 'local': True, 'sd': True},
            ],
            "customTypes": [],
        }

    ##~~ TemplatePlugin
    def get_template_configs(self):
        return [
            {
                "type": "settings",
                "name": "Filetypes Plugin",
                "template": "filetypes_settings.jinja2",
                "custom_bindings": True,
            }
        ]

    def get_template_vars(self):
        return dict(
            defaultTypes=self._settings.get(["defaultTypes"]),
            customTypes=self._settings.get(["customTypes"])
        )

    ##~~ AssetPlugin mixin
    def get_assets(self):
        return dict(
            js=["js/filetypes.js"]
        )

    ##~~ Softwareupdate hook
    def get_update_information(self):
        return dict(
            filetypes=dict(
                displayName="Filetypes Plugin",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="TheLongRunSmoke",
                repo="OctoPrint-Filetypes",
                current=self._plugin_version,

                # update method: pip
                pip="https://github.com/TheLongRunSmoke/OctoPrint-Filetypes/archive/{target_version}.zip"
            )
        )


__plugin_name__ = "Filetypes Plugin"
__plugin_version__ = "0.1.1"
__plugin_description__ = "Select which filetypes can be uploaded to OctoPrint."
__plugin_pythoncompat__ = ">=2.7,<4"
__plugin_implementation__ = FiletypesPlugin()
__plugin_hooks__ = {
    "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
}
