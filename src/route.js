(async PLUGIN_ID => {
  'use strict';
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  const HOLIDAY_MANAGEMENT_APP_ID = config.appId;
  kintone.events.on('app.record.detail.process.proceed', async event => {
    try {
      if (event.nextStatus.value !== '取得済') return event;

      const leaveCount = Number(event.record.休暇日数合計.value);
      const remainingLeaveCount = Number(event.record.残有給日数.value);
      if (remainingLeaveCount < leaveCount) {
        event.error = '残有給日数が不足しています\n申請を取り消します';
      } else {
        const resp = await kintone.api('/k/v1/records.json', 'GET', {
          app: HOLIDAY_MANAGEMENT_APP_ID,
          query: `社員番号 = "${event.record.社員番号.value}"`,
          fields: ['取得済日数', '残日数'],
        });
        await kintone.plugin.app.proxy(
          PLUGIN_ID,
          kintone.api.url('/k/v1/record.json'),
          'PUT',
          {
            'Content-Type': 'application/json',
          },
          {
            app: HOLIDAY_MANAGEMENT_APP_ID,
            updateKey: {
              field: '社員番号',
              value: event.record.社員番号.value,
            },
            record: {
              取得済日数: {
                value: Number(resp.records[0].取得済日数.value) + leaveCount,
              },
              残日数: {
                value: Number(resp.records[0].残日数.value) - leaveCount,
              },
            },
          }
        );
        alert('有給休暇マスタの更新が完了しました');
      }
      return event;
    } catch (error) {
      console.log(error);
      alert('エラーが発生しました\n申請を取り消します');
      return false;
    }
  });
})(kintone.$PLUGIN_ID);
