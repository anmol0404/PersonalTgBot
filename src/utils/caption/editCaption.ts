export function processCaption(oldCaption: string, join: string): string {
  let newCaption: string = "";
  const stringWithoutSpecialChars: string = oldCaption
    .replace(/\./g, " ")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/JOIN: think/g, " ")
    .replace(/@DA_Rips/g, " ")
    .replace(/Rips/g, " ")
    .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
  newCaption = stringWithoutSpecialChars.replace(/@\w+\s?/g, " ");
  const indexOfSize: number = newCaption.indexOf("🔘 SIZE");
  const plotIndex: number = newCaption.indexOf("Plot:");
  const mkv: number = newCaption.indexOf("mkv");
  const story: number = newCaption.indexOf("Story Line");
  const drama: number = newCaption.indexOf("Drama:");

  if (indexOfSize !== -1) {
    newCaption = newCaption.substring(0, indexOfSize);
  } else {
    newCaption = newCaption;
  }
  if (plotIndex !== -1) {
    newCaption = newCaption.substring(0, plotIndex);
  }
  if (mkv !== -1) {
    newCaption = newCaption.substring(0, mkv + 3);
  }
  if (story !== -1) {
    newCaption = newCaption.substring(0, story);
  }
  if (drama !== -1) {
    newCaption = newCaption.substring(drama);
  }
  newCaption += `\n 1080p MUXED SUBTITLES`;

  return newCaption;
}
export function editAIOTitle(oldCaption: string, join: string): string {
  let newCaption: string = "";
  const stringWithoutSpecialChars: string = oldCaption
    .replace(/\./g, " ")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace("Join ➪ 🎯𝙆&𝘾 𝘿𝙧𝙖𝙢𝙖 𝙃𝙪𝙗🎯", " ")
    .replace("JOIN:  for more drama movies!!", " ")
    .replace("for more drama movies!!", "")
    .replace("JOIN:", "")
    .replace("JOIN:  drama", "")
    .replace("for Back up!!", "")
    .replace(/JOIN: think/g, "")
    .trim()
    .replace(/@DA_Rips/g, " ")
    .replace(/Rips/g, " ")
    .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
  newCaption = stringWithoutSpecialChars.replace(/@\w+\s?/g, " ");
  const indexOfSize: number = newCaption.indexOf("🔘 SIZE");
  const plotIndex: number = newCaption.indexOf("Plot:");
  const mkv: number = newCaption.indexOf("mkv");
  const story: number = newCaption.indexOf("Story Line");
  const drama: number = newCaption.indexOf("Drama:");

  if (indexOfSize !== -1) {
    newCaption = newCaption.substring(0, indexOfSize);
  } else {
    newCaption = newCaption;
  }
  if (plotIndex !== -1) {
    newCaption = newCaption.substring(0, plotIndex);
  }
  if (mkv !== -1) {
    newCaption = newCaption.substring(0, mkv + 3);
  }
  if (story !== -1) {
    newCaption = newCaption.substring(0, story);
  }
  if (drama !== -1) {
    newCaption = newCaption.substring(drama);
  }
  newCaption += `\nRequest In: @${join}`;

  return newCaption;
}