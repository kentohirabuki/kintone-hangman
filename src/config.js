(PLUGIN_ID => {
  'use strict';

  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  if (!config) {
    window.alert('プラグインの読み込みに失敗しました');
    window.location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
  }
  document.getElementById('appId').value = config.appId || '';

  const proxyConfig = kintone.plugin.app.getProxyConfig(kintone.api.url('/k/v1/records.json'), 'PUT');
  // document.getElementById('token').value = proxyConfig.headers['X-Cybozu-API-Token'] || '';

  // 「保存する」ボタン押下時の処理
  document.getElementById('submit').addEventListener('click', () => {
    const text = document.getElementById('appId').value;
    kintone.plugin.app.setProxyConfig(
      kintone.api.url('/k/v1/record.json'),
      'PUT',
      {
        'X-Cybozu-API-Token': document.getElementById('token').value,
      },
      {},
      () => {
        try {
          console.log(countCharacters(text));
          kintone.plugin.app.setConfig({appId: text}, () => {
            alert('プラグインの設定を保存しました');
            window.location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
          });
        } catch (e) {
          console.log(e);
        }
      }
    );
  });

  // 「キャンセル」ボタン押下時の処理
  document.getElementById('cancel').addEventListener('click', () => {
    history.back();
  });
})(kintone.$PLUGIN_ID);

function countCharacters(str) {
  let count = 0;

  str.split('').forEach(char => {
    // 全角文字はUnicodeの範囲がU+3000以上
    if (char.match(/[^\x00-\x7F]/)) {
      count += 3; // 全角は3カウント
    } else {
      count += 1; // 半角は1カウント
    }
  });
  return count;
}
