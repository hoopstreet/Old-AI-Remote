const crypto = require("crypto");

function hash(content) {
  return crypto.createHash("sha256").update(content || "").digest("hex");
}

function buildDiff(oldFiles = {}, newFiles = []) {
  const changes = [];

  for (const file of newFiles) {
    const oldHash = oldFiles[file.path];
    const newHash = hash(file.content);

    if (!oldHash) {
      changes.push({ type: "NEW", file: file.path });
    } else if (oldHash !== newHash) {
      changes.push({ type: "MODIFIED", file: file.path });
    }
  }

  return changes;
}

module.exports = { hash, buildDiff };
