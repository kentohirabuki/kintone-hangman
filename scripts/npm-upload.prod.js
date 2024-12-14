const process = require('process');

(async () => {
  const {existsSync} = require('fs');
  const npmRun = require('npm-run');

  const {pluginZipFilePath} = require('../webpack-utils');
  // const {waitForFileCreateOrUpdate} = require('./utils');

  const args = process.argv.slice(2);
  const isWatchMode = args.includes('--watch');
  const zipFileExists = () => existsSync(pluginZipFilePath);

  if (!isWatchMode) {
    if (!zipFileExists()) {
      // console.error(`Missing zip file '${pluginZipFilePath}'.`);
      return;
    }
  } else {
    try {
      // const result = await waitForFileCreateOrUpdate(pluginZipFilePath);
      // console.info(`Zip file '${pluginZipFilePath}' ${result}!`);
    } catch (error) {
      // console.error(error);
      process.exit(1);
    }
  }

  const url1 = 'https://crena-staging.cybozu.com';
  const username1 = 'releaser';
  const password1 = 'releaser1234';
  const uploadArgs1 = [
    pluginZipFilePath,
    `--base-url ${url1}`,
    `--username ${username1}`,
    `--password ${password1}`,
    '--waiting-dialog-ms 5000',
    ...args,
  ];
  const ps1 = npmRun.exec(`kintone-plugin-uploader ${uploadArgs1.join(' ')}`);
  ps1.stdout.pipe(process.stdout);
  process.on('exit', () => ps1.kill());

  const url2 = 'https://crena-plugin.cybozu.com';
  const username2 = 'releaser';
  const password2 = 'releaser1234';
  const uploadArgs2 = [
    pluginZipFilePath,
    `--base-url ${url2}`,
    `--username ${username2}`,
    `--password ${password2}`,
    '--waiting-dialog-ms 5000',
    ...args,
  ];
  const ps2 = npmRun.exec(`kintone-plugin-uploader ${uploadArgs2.join(' ')}`);
  ps2.stdout.pipe(process.stdout);
  process.on('exit', () => ps2.kill());
})();
