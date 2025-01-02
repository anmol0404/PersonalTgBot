export function processCaption(oldCaption, join) {
    var newCaption = "";
    var stringWithoutSpecialChars = oldCaption
        .replace(/\./g, " ")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/JOIN: think/g, " ")
        .replace(/@DA_Rips/g, " ")
        .replace("@ADrama_Lovers", " ")
        .replace(/Rips/g, " ")
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    newCaption = stringWithoutSpecialChars.replace(/@\w+\s?/g, " ");
    var indexOfSize = newCaption.indexOf("🔘 SIZE");
    var plotIndex = newCaption.indexOf("Plot:");
    var mkv = newCaption.indexOf("mkv");
    var story = newCaption.indexOf("Story Line");
    var drama = newCaption.indexOf("Drama:");
    if (indexOfSize !== -1) {
        newCaption = newCaption.substring(0, indexOfSize);
    }
    else {
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
    newCaption += "join: ".concat(join);
    return newCaption;
}
export function editAIOTitle(oldCaption, join) {
    var newCaption = "";
    var stringWithoutSpecialChars = oldCaption
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
    var indexOfSize = newCaption.indexOf("🔘 SIZE");
    var plotIndex = newCaption.indexOf("Plot:");
    var mkv = newCaption.indexOf("mkv");
    var story = newCaption.indexOf("Story Line");
    var drama = newCaption.indexOf("Drama:");
    if (indexOfSize !== -1) {
        newCaption = newCaption.substring(0, indexOfSize);
    }
    else {
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
    newCaption += "\nRequest In: @".concat(join);
    return newCaption;
}
