import os

# Map display names to their repo folder names
languages = {
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "Python": "python",
    "C++": "cpp",
    "C": "c",
    "C#": "csharp",
    "Java": "java",
}

# File extensions per language
lang_ext = {
    "JavaScript": ".js",
    "TypeScript": ".ts",
    "Python": ".py",
    "C++": ".cpp",
    "C": ".c",
    "C#": ".cs",
    "Java": ".java",
}

# README header (before the generated table)
readme_header = """# LeetCode Solutions

This repository contains my solutions to LeetCode problems in multiple programming languages.
It is a personal archive for practice and learning purposes.

---

## 📑 Problem Index

| Problem | Difficulty | JavaScript | TypeScript | Python | C++ | C | C# | Java |
|---------|------------|------------|------------|--------|-----|---|----|------|
"""

def detect_difficulty(path: str) -> str:
    """Infer difficulty from folder name."""
    p = path.lower()
    if "easy" in p:
        return "Easy"
    if "medium" in p:
        return "Medium"
    if "hard" in p:
        return "Hard"
    return "Unknown"

def humanize_problem(filename: str) -> str:
    """Convert a file name to a nice problem title."""
    name, _ = os.path.splitext(filename)
    name = name.replace("-", " ").replace("_", " ")
    return name.title()

def build_problem_index():
    problems = {}

    for lang, folder in languages.items():
        if not os.path.exists(folder):
            continue

        for root, _, files in os.walk(folder):
            for f in files:
                if f.endswith(lang_ext[lang]):
                    difficulty = detect_difficulty(root)
                    problem_name = humanize_problem(f)
                    path = os.path.join(root, f).replace("\\", "/")

                    if problem_name not in problems:
                        problems[problem_name] = {"Difficulty": difficulty}
                        for l in languages:
                            problems[problem_name][l] = "–"

                    problems[problem_name][lang] = f"[Link]({path})"

    return problems

def update_readme():
    problems = build_problem_index()
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(readme_header)
        for problem, langs in sorted(problems.items()):
            row = f"| {problem} | {langs['Difficulty']} "
            for l in languages:
                row += f"| {langs[l]} "
            row += "|\n"
            f.write(row)

if __name__ == "__main__":
    update_readme()
    print("README.md updated!")
