# coding=utf-8
from __future__ import absolute_import

### (Don't forget to remove me)
# This is a basic skeleton for your plugin's __init__.py. You probably want to adjust the class name of your plugin
# as well as the plugin mixins it's subclassing from. This is really just a basic skeleton to get you started,
# defining your plugin as a template plugin, settings and asset plugin. Feel free to add or remove mixins
# as necessary.
#
# Take a look at the documentation on what other plugin mixins are available.

import octoprint.plugin


class FiletypesPlugin(octoprint.plugin.StartupPlugin,
					  octoprint.plugin.TemplatePlugin,
					  octoprint.plugin.SettingsPlugin,
					  octoprint.plugin.AssetPlugin):

	def get_template_configs(self):
		return [
			dict(type="navbar", custom_bindings=False),
			dict(type="settings", custom_bindings=False),
			dict(type="generic", custom_bindings=False)
		]

	def on_after_startup(self):
		self._logger.info("Filetypes. (settings: stl=%s, gcode=%s, gco=%s, g=%s)" % (self._settings.get(["stl"]), self._settings.get(["gcode"]), self._settings.get(["gco"]), self._settings.get(["g"])))

	##~~ SettingsPlugin mixin
	def get_settings_defaults(self):
		"""
		Return defaults.
		:return: dict  
		"""
		return dict(
			stl=True,
			gcode=True,
			gco=True,
			g=True
		)

	def get_template_vars(self):
		return dict(
			stl=self._settings.get(["stl"]),
			gcode=self._settings.get(["gcode"]),
			gco=self._settings.get(["gco"]),
			g=self._settings.get(["g"])
		)

	##~~ AssetPlugin mixin
	def get_assets(self):
		# Define your plugin's asset files to automatically include in the
		# core UI here.
		return dict(
			js=["js/filetypes.js"]
		)

	##~~ Softwareupdate hook

	def get_update_information(self):
		# Define the configuration for your plugin to use with the Software Update
		# Plugin here. See https://github.com/foosel/OctoPrint/wiki/Plugin:-Software-Update
		# for details.
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


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "Filetypes Plugin"


def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = FiletypesPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}
