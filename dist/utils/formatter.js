export var prettyBytes = function (bytes) {
    var units = ['B', 'KB', 'MB', 'GB'];
    var size = bytes;
    var unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return "".concat(size.toFixed(2), " ").concat(units[unitIndex]);
};
export var formatDuration = function (seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    return [hours, minutes, remainingSeconds]
        .map(function (v) { return v < 10 ? "0" + v : v; })
        .filter(function (v, i) { return v !== "00" || i > 0; })
        .join(":");
};
export var formatProgress = function (downloaded, total) {
    var progress = (downloaded / total) * 100;
    var progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
    return "".concat(progressBar, " ").concat(progress.toFixed(1), "%");
};
