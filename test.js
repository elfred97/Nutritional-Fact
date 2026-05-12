async function decodeSecretMessage(docUrl) {
  try {
    // Convert Google Doc URL to text export URL
    if (docUrl.includes("/edit")) {
      docUrl = docUrl.split("/edit")[0];
    }

    const exportUrl = `${docUrl}/export?format=txt`;

    const response = await fetch(exportUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch document");
    }

    const text = await response.text();

    // Split and clean lines
    const lines = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "");

    const points = [];

    // Find data dynamically
    for (let i = 0; i < lines.length - 2; i++) {
      const x = parseInt(lines[i], 10);
      const char = lines[i + 1];
      const y = parseInt(lines[i + 2], 10);

      if (!isNaN(x) && !isNaN(y) && char.length > 0) {
        points.push({ x, y, char });
      }
    }

    if (points.length === 0) {
      console.log("No valid points found.");
      return;
    }

    // Determine grid size
    const maxX = Math.max(...points.map(p => p.x));
    const maxY = Math.max(...points.map(p => p.y));

    // Create empty grid
    const grid = Array.from({ length: maxY + 1 }, () =>
      Array(maxX + 1).fill(" ")
    );

    // Fill grid
    for (const { x, y, char } of points) {
      grid[y][x] = char;
    }

    // Print result
    for (const row of grid) {
      console.log(row.join(""));
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
}


// Replace with your real Google Doc URL
decodeSecretMessage(
  "https://docs.google.com/document/d/1Ri8fFMHvZ3foe_SGV6ixYmiZBBmsqTlJLQhm4mLJii4/edit?tab=t.0"
);