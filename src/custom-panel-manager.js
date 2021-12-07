class CustomPanelManager {
    TRANSPARENT_1PX_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    GAME_MENU_ITEMS = [];
    STATE_IGNORED_MENU_ITEMS = [
        "Loot Log",
        "Wiki",
        "Rules",
        "Reddit",
        "Discord",
        "Forum",
        "Change Character",
        "Send Feedback",
        "Donate",
        "Logout",
    ];

    static async attach() {
        if (typeof window.PanelManager === "undefined") {
            console.debug("CustomPanelManager: creating new panel manager");
            window.PanelManager = new CustomPanelManager();
            return window.PanelManager.waitForNavDrawer()
                .then((navDrawer) => window.PanelManager.setGameMenuItems(navDrawer))
                .then(() => window.PanelManager.watchNavigationClicks());
        } else {
            console.debug("CustomPanelManager: already exists, waiting for nav drawer");
            return window.PanelManager.waitForNavDrawer();
        }
    }

    async waitForNavDrawer() {
        return new Promise((resolve) => {
            let waitForNavbar = setInterval(() => {
                let t = document.querySelector("div.status-action");
                if (t === null) return;

                let navDrawer = document.querySelector("div.nav-drawer-container");
                if (navDrawer === null || !navDrawer.hasChildNodes()) return;

                navDrawer.childNodes.forEach((n) => {
                    if (n.innerText === "Logout") {
                        clearInterval(waitForNavbar);
                        resolve(navDrawer);
                    }
                });
            }, 250);
        });
    }

    setGameMenuItems(navDrawer) {
        this.GAME_MENU_ITEMS = [];
        navDrawer.childNodes.forEach((c) => {
            if (c.className === "drawer-item active noselect" && !this.STATE_IGNORED_MENU_ITEMS.includes(c.innerText)) {
                this.GAME_MENU_ITEMS.push(c);
            }
        });
    }

    addMenuItem(title, adjacentItem, callback = () => {}, position = "after", iconSrc = "") {
        let navDrawer = document.querySelector("div.nav-drawer-container");
        if (navDrawer === null) throw "CustomPanelManager: couldn't find navigation drawer";

        let adjacentElement = false;
        navDrawer.childNodes.forEach((n) => {
            if (n.innerText === adjacentItem) adjacentElement = n;
        });

        if (!adjacentElement) throw `CustomPanel: couldn't find menu item ${adjacentItem}`;

        let newMenuItem = document.createElement("div");
        newMenuItem.className = "drawer-item active noselect custom-ext-panel-menu-item";
        newMenuItem.addEventListener("click", () => callback(this, title, iconSrc));
        let newMenuItemText = newMenuItem.appendChild(document.createElement("div"));
        if (iconSrc !== "") {
            let icon = newMenuItemText.appendChild(document.createElement("img"));
            icon.className = "drawer-item-icon";
            icon.src = iconSrc;
        }
        newMenuItemText.className = "drawer-item-left";
        newMenuItemText.append(title);

        switch (position) {
            case "after":
                adjacentElement.insertAdjacentElement("afterend", newMenuItem);
                break;
            case "before":
                adjacentElement.insertAdjacentElement("beforebegin", newMenuItem);
                break;
            default:
                throw "CustomPanelManager: incorrect position given for new menu item";
        }

        this.STATE_IGNORED_MENU_ITEMS.push(title);
    }

    watchNavigationClicks() {
        let self = this;

        let navDrawer = document.getElementsByClassName("nav-drawer-container")[0];
        navDrawer.addEventListener("click", function (e) {
            let target = e.target.classList.contains("drawer-item") ? e.target : e.target.closest("div.drawer-item.active.noselect");
            if (target === null) return;
            if (self.STATE_IGNORED_MENU_ITEMS.includes(target.innerText)) return;
            if (!self.GAME_MENU_ITEMS.includes(target)) {
                self.removePlayArea(false);
                return;
            }
            self.removePlayArea();
        });

        let headerContainer = document.querySelector("div.header-level-container");
        headerContainer.addEventListener("click", function (e) {
            let remove = false;
            if (e.target.classList.contains("skill-level-bar") || e.target.closest("div.skill-level-bar") !== null) {
                remove = true;
            }
            if ((e.target.classList.contains("exp-tooltip") && e.target.tagName === "TD") || e.target.closest("td.exp-tooltip") !== null) {
                remove = true;
            }

            if (remove) self.removePlayArea();
        });
    }

    createPlayArea(title, iconSrc, theme = "smithing") {
        let playAreaContainer = document.getElementsByClassName("play-area-container")[0];
        let navTab = playAreaContainer.getElementsByClassName("custom-ext-panel-tab")[0];

        navTab.firstChild.attributes.src.value = iconSrc === "" ? this.TRANSPARENT_1PX_PNG : iconSrc;
        navTab.lastChild.data = title;

        let playArea = playAreaContainer.appendChild(document.createElement("div"));
        playArea.className = `play-area theme-${theme} custom-ext-panel`;

        return playArea;
    }

    clearPlayArea() {
        let container = document.getElementsByClassName("play-area-container")[0];

        let playAreas = container.getElementsByClassName("play-area");
        for (let playArea of playAreas) {
            if (playArea.classList.contains("custom-ext-panel")) {
                playArea.remove();
            } else {
                playArea.style.display = "none";
            }
        }

        let navTabs = container.getElementsByClassName("nav-tab-left");
        let gameTab;
        for (let navTab of navTabs) {
            if (navTab.classList.contains("custom-ext-panel-tab")) {
                navTab.remove();
            } else {
                gameTab = navTab;
                navTab.style.display = "none";
            }
        }
        let newTab = gameTab.cloneNode(true);
        newTab.style.display = "";
        newTab.classList.add("custom-ext-panel-tab");
        newTab.firstChild.attributes.src.value = "/images/loading_animation.svg";
        newTab.lastChild.data = "";
        gameTab.insertAdjacentElement("afterend", newTab);
    }

    removePlayArea(restorePlayArea = true) {
        let container = document.getElementsByClassName("play-area-container")[0];
        let playAreas = container.getElementsByClassName("play-area");
        for (let playArea of playAreas) {
            if (playArea.classList.contains("custom-ext-panel")) {
                playArea.remove();
            } else if (restorePlayArea) {
                playArea.style.display = "";
            }
        }

        let navTabs = container.getElementsByClassName("nav-tab-left");
        for (let navTab of navTabs) {
            if (navTab.classList.contains("custom-ext-panel-tab")) {
                navTab.remove();
            } else if (restorePlayArea) {
                navTab.style.display = "";
            }
        }
    }
}