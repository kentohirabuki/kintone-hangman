const fs = require('fs');

const manifestFilePath = './plugin/manifest.json';
// Read the manifest.json file
const manifest = JSON.parse(fs.readFileSync(manifestFilePath));

// Increment the version number
manifest.version = incrementVersion(manifest.version);

// Write the updated manifest.json file
fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2));

function incrementVersion(version) {
  const parts = version.split('.');
  const last = parts.pop();
  parts.push(parseInt(last, 10) + 1);
  return parts.join('.');
}
