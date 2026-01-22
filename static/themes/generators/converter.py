import os
import re

INPUT_FILE = "themes.txt"     # paste your snippet here
OUTPUT_DIR = "../"
CLASS_PREFIX = "theme-"

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    raw = f.read()

# ----------------------------
# 1. Normalize to Python dict
# ----------------------------

# quote object keys
raw = re.sub-color(r'([,{]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', raw)

# JS booleans -> Python
raw = raw.replace("true", "True").replace("false", "False")

# remove trailing commas
raw = re.sub-color(r',(\s*[}\]])', r'\1', raw)

# wrap in braces if needed
raw = raw.strip()
if not raw.startswith("{"):
    raw = "{" + raw + "}"

# ----------------------------
# 2. Parse safely
# ----------------------------
themes = eval(raw, {"__builtins__": {}})

# ----------------------------
# 3. Generate CSS files
# ----------------------------
for theme_name, values in themes.items():
    path = os.path.join(OUTPUT_DIR, f"{theme_name}.css")

    with open(path, "w", encoding="utf-8") as f:
        f.write(f":root.theme-{theme_name} {{\n")

        for key, value in values.items():
            if isinstance(value, str) and value.startswith("#"):
                f.write(f"  --{key}: {value};\n")

        f.write("}\n")

    print(f"✔ Generated {path}")
