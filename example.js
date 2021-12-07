class Example {
    constructor() {
        CustomPanelManager.attach()
            .then(() => this.addMenuItems())
    }
    addMenuItems() {
        window.PanelManager.addMenuItem("Custom Item 1", "Settings", this.openItemOne, "after", "/images/cooking/potato.png");
        window.PanelManager.addMenuItem("Custom Item 2", "Settings", this.openItemTwo, "after", "/images/cooking/banana.png");
    }

    openItemOne(self, title, icon) {
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);

        let panel = playArea.appendChild(document.createElement("div"));
        panel.className = "settings-panel custom-ext-panel-settings";

        panel.append("Hello!")
    }

    openItemTwo(self, title, icon) {
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);
        playArea.append("Bonjour!")
    }
}

class Example2 {
    constructor() {
        CustomPanelManager.attach()
            .then(() => this.addMenuItems())
    }
    addMenuItems() {
        window.PanelManager.addMenuItem("Custom Item 3", "Settings", this.openItemThree, "after", "/images/cooking/pumpkin.png");
        window.PanelManager.addMenuItem("Custom Item 4", "Settings", this.openItemFour, "after");
    }

    openItemThree(self, title, icon) {
        console.log(self);
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);
        playArea.append("Wow!")
    }

    openItemFour(self, title, icon) {
        console.log(self);
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);
        playArea.append("Neato!")
    }
}

window.example = new Example();
window.example2 = new Example2();