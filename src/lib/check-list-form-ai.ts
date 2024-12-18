export function checkListFromAI(content: string): { title: string; list: string[] } | undefined {
  if (content.toLowerCase().includes("ingredient") || content.toLowerCase().includes("bahan")) {
    const ingredientPattern = /(\*\*(Bahan|Ingredients|Bahan-bahan):\*\*\n\n)((\* .*\n)+)/;
    const match = content.match(ingredientPattern);
    if (!match) return;
    const lines = match[0].split("\n");
    const heading = lines[0];
    const ingredients = lines.slice(2).join("\n").replace(/^\* /gm, "");
    const ingredientsAddToContainer = ingredients.split("\n").filter((string) => string.trim() !== "");

    return { title: heading, list: ingredientsAddToContainer };
  }
}
