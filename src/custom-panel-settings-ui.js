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

    static createSettingsColorPicker(description, color, defaultColor, saveCallback = () => {}) {
        let row = document.createElement("div");
        row.className = "settings-row";

        let picker = row.appendChild(document.createElement("input"));
        picker.type = "color";
        picker.value = color;
        picker.className = "settings-button";
        picker.style.backgroundColor = "transparent";

        let save = row.appendChild(document.createElement("div"));
        save.className = "settings-button";
        save.style.textAlign = "center";
        save.onclick = () => saveCallback(picker.value);
        save.append("Save");

        let reset = row.appendChild(document.createElement("div"));
        reset.className = "settings-button";
        reset.style.backgroundColor = "#8B0000";
        reset.style.textAlign = "center";
        reset.onclick = () => {
            picker.value = color;
            saveCallback(picker.value);
        };
        reset.append("Reset");

        let defaultButton = row.appendChild(document.createElement("div"));
        defaultButton.className = "settings-button";
        defaultButton.style.backgroundColor = "#8B0000";
        defaultButton.style.textAlign = "center";
        defaultButton.onclick = () => {
            picker.value = defaultColor;
            saveCallback(picker.value);
        };
        defaultButton.append("Default");

        let label = row.appendChild(document.createElement("label"));
        label.style.height = "28px";
        label.style.lineHeight = "28px";
        label.style.marginLeft = "10px";
        label.style.marginBottom = "0px";
        label.style.marginTop = "3px";
        label.append(`${description}`);

        return row;
    }
}
