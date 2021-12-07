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
       addMenuItems() {
           window.PanelManager.addMenuItem("Custom Item 1", "Settings", this.openYourCustomMenuItem, "after", "/images/cooking/potato.png");
       }
   
       openYourCustomMenuItem(self, title, icon) {
            window.PanelManager.clearPlayArea();
            let playArea = window.PanelManager.createPlayArea(title, icon);
            playArea.append("All of your content can be appended here however you want")
       }
   }
   ```