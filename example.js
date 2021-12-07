class Example {
    constructor() {
        CustomPanelManager.attach()
            .then(() => this.addMenuItems())
    }

    addMenuItems() {
        // Bind vs. arrow notation, either is fine
        window.PanelManager.addMenuItem(
            "Custom Item 1", "Settings", (title, icon) => this.openItemOne(title, icon), "before", "/images/cooking/potato.png"
        );
        window.PanelManager.addMenuItem(
            "Custom Item 2", "Settings", this.openItemTwo.bind(this), "after", "/images/cooking/banana.png"
        );
    }

    openItemOne(title, icon) {
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);

        let panel = playArea.appendChild(document.createElement("div"));
        panel.className = "settings-panel custom-ext-panel-settings";

        panel.append("Hello!")
    }

    openItemTwo(title, icon) {
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);
        playArea.append("Bonjour!")
    }
}

// Example of multiple classes (potentially from separate extensions) waiting for the panel manager to attach
class Example2 {
    constructor() {
        CustomPanelManager.attach()
            .then(() => this.addMenuItems())
    }

    addMenuItems() {
        window.PanelManager.addMenuItem("Custom Item 3", "Quests", (title, icon) => this.openItemThree(title, icon), "before", "/images/cooking/pumpkin.png");
        window.PanelManager.addMenuItem("Custom Item 4", "Quests", this.openItemFour.bind(this), "after");
    }

    openItemThree(title, icon) {
        console.log(self);
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);
        playArea.append("Wow!")
    }

    openItemFour(title, icon) {
        console.log(self);
        window.PanelManager.clearPlayArea();
        let playArea = window.PanelManager.createPlayArea(title, icon);
        playArea.append("Neato!")
    }
}

window.example = new Example();
window.example2 = new Example2();