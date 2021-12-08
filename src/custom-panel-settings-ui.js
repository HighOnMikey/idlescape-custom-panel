class CustomPanelSettingsUI {
    static createSection() {
        let section = document.createElement("div");
        section.style.marginBottom = "3em";

        return section;
    }

    static createSettingsHeader(title) {
        let row = document.createElement("div");
        row.className = "settings-label";
        row.innerText = title;
        row.appendChild(document.createElement("hr"));

        return row;
    }

    static createSettingsCheckbox(description, checked, onchangeCallback = () => {}, name = null, value = null) {
        let row = document.createElement("div");
        row.className = "settings-row";
        let label = row.appendChild(document.createElement("label"));
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.opacity = "1";
        checkbox.style.position = "static";
        checkbox.checked = checked;

        if (name !== null && name instanceof String) {
            checkbox.name = name;
        }

        if (value !== null) {
            checkbox.value = value;
        }

        checkbox.onchange = (e) => {
            onchangeCallback(e.target.checked);
        };
        label.append(checkbox);
        label.append(` ${description}`);

        return row;
    }
}
