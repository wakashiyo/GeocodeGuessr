const { Client } = require('@googlemaps/google-maps-services-js');
require('dotenv').config();

// APIキーを.envファイルから環境変数として読み込み
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// APIキーが設定されているかを確認
if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('Google Maps APIキーが設定されていません。.envファイルを確認してください。');
}

// Geocoding APIのクライアントを作成
const googleMapsClient = new Client({});

let currentCountryName = null; // 現在のクイズの国名をグローバル変数として定義

module.exports = (robot) => {
  // メッセージの受信時に実行される処理
  robot.respond(/guess$/i, async (res) => {
    try {
      // ランダムな緯度・経度を生成
      const minLatitude = -60.0;  // 緯度の最小値
      const maxLatitude = 90.0;   // 緯度の最大値
      const minLongitude = -180.0;  // 経度の最小値
      const maxLongitude = 180.0;   // 経度の最大値

      const latitude = minLatitude + (maxLatitude - minLatitude) * Math.random();
      const longitude = minLongitude + (maxLongitude - minLongitude) * Math.random();

      // Geocoding APIを使用して国名を取得
      const response = await googleMapsClient.reverseGeocode({
        params: {
          latlng: `${latitude},${longitude}`,
          key: GOOGLE_MAPS_API_KEY,
          language: 'ja'
        }
      });

      console.log(response.data);

      const results = response.data.results;
      if (!results || results.length === 0) {
        throw new Error('指定した緯度・経度に対応する場所が見つかりませんでした。');
      }

      currentCountryName = null; // 現在のクイズの国名をリセット

      for (const result of results) {
        for (const component of result.address_components) {
          if (component.types.includes('country')) {
            currentCountryName = component.long_name;
            break;
          }
        }
        if (currentCountryName) {
          break;
        }
      }

      if (!currentCountryName) {
        throw new Error('国名が見つかりませんでした。');
      }

      console.log(currentCountryName);

      // クイズを出題
      res.send(`この場所はどこの国でしょう？国名を答えてね！\n緯度: ${latitude}\n経度: ${longitude}`);

    } catch (err) {
      console.error(err);
      res.reply('ごめんね、うまくデータを取得できなかったみたい。もう一度試してみてね。');
    }
  });

  // 回答の受信時の処理を登録
  robot.hear(/^(.+)/i, (msg) => {
    // 現在のクイズの国名がnullでない場合のみ判定を行う
    if (currentCountryName) {
      const answer = msg.match[1].trim().replace(/^Hubot\s+/i, ''); // ユーザーの回答

      // 正誤判定
      if (answer === currentCountryName) {
        msg.send('正解です！');
      } else {
        msg.send(`残念！正解は ${currentCountryName} です！`);
      }
      // クイズが終了したので、現在の国名をnullにリセット
      currentCountryName = null;
    }
  });
};