# Custom Panel
A custom panel creator for Idlescape extensions.

## Usage
1. Require the library in your user script
   ```javascript
   // ==UserScript==
   // ...
   // @require https://raw.githubusercontent.com/HighOnMikey/idlescape-custom-panel/main/src/custom-panel-manager.js
   // ...
   ```
2. Define a new panel and menu item
   ```javascript
   class Example {
       constructor() {
           CustomPanelManager.attach()
               .then(() => this.addMenuItems());
       }

       addMenuItems() {
           window.PanelManager.addMenuItem("Custom Item 1", "Settings", this.openYourCustomMenuItem, "after", "/images/cooking/potato.png");
       }

       openYourCustomMenuItem(title, icon) {
            window.PanelManager.clearPlayArea();
            let playArea = window.PanelManager.createPlayArea(title, icon);
            playArea.append("All of your content can be appended here however you want");
       }
   }
   ```
   
# Settings UI Elements
There are three UI elements that you can use which utilize callbacks to pass data around. These are primarily used for extension settings
pages.

## Usage
For a full example of the UI element use, [see here](https://github.com/HighOnMikey/idlescape-enragedrobot/blob/main/src/extensions/ui/settings.js).

1. Require the library in your user script
   ```javascript
   // ==UserScript==
   // ...
   // @require https://raw.githubusercontent.com/HighOnMikey/idlescape-custom-panel/main/src/custom-panel-settings-ui.js
   // ...
   ```
2. Add UI elements to panel
   ```javascript
   class Example {
       constructor() {
           CustomPanelManager.attach()
               .then(() => this.addMenuItems());
       }

       openYourCustomMenuItem(title, icon) {
           window.PanelManager.clearPlayArea();
           let playArea = window.PanelManager.createPlayArea(title, icon);
           let panel = playArea.appendChild(CustomPanelSettingsUI.createSettingsPanel());
   
           let exampleSection = panel.appendChild(CustomPanelSettingsUI.createSection());
           exampleSection.append(
               CustomPanelSettingsUI.createSettingsCheckbox(description, true, saveCallback = (checked) => {}),
               CustomPanelSettingsUI.createSettingsColorPicker(description, color, defaultColor, saveCallback = (color) => {}),
               CustomPanelSettingsUI.createSettingsKeybind(description, key, defaultKey, saveCallback = (key) => {})
           );

           let otherSection = panel.appendChild(CustomPanelSettingsUI.createSection());
           exampleSection.append(
               CustomPanelSettingsUI.createSettingsCheckbox(description, true, saveCallback = (checked) => {}),
               CustomPanelSettingsUI.createSettingsColorPicker(description, color, defaultColor, saveCallback = (color) => {}),
               CustomPanelSettingsUI.createSettingsKeybind(description, key, defaultKey, saveCallback = (key) => {})
           );
       }
   }
   ```