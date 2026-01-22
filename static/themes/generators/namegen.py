import os

# Directory where your CSS files are located
CSS_DIR = "../"
OUTPUT_FILE = "themes.js" # need to relocate to src/lib/client anyway.

def generate_friendly_name(file_name):
    # Remove extension
    name = file_name.rsplit('.', 1)[0]
    # Replace underscores with spaces
    name = name.replace('_', ' ')
    return name

def main():
    css_files = [f for f in os.listdir(CSS_DIR) if f.endswith('.css')]
    themes = []

    for file in css_files:
        theme_id = file.rsplit('.', 1)[0]  # filename without extension
        friendly_name = generate_friendly_name(theme_id)
        themes.append({
            "id": theme_id,
            "name": friendly_name,
            "file": file
        })

    # Write the JS module
    with open(OUTPUT_FILE, "w") as f:
        f.write("// THIS FILE IS AUTO-GENERATED\n")
        f.write("export const themes = [\n")
        for t in themes:
            f.write(f"  {{ id: '{t['id']}', name: '{t['name']}', file: '{t['file']}' }},\n")
        f.write("];\n\n")
        f.write("""export function getTheme(id) {
  return themes.find(t => t.id === id);
}\n""")

    print(f"Generated {OUTPUT_FILE} with {len(themes)} themes.")

if __name__ == "__main__":
    main()
