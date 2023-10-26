# Geocord Guessr
 Google Maps PlattformのGeocoding APIを使って、座標からその国を当てるというチャットボットのゲームです。


## 概要
 大学の授業の最終課題として、チャットツールの「direct」で動くチャットボットを作成しました。
 node.jsを使ってプログラミングし、そのほかにGoogle Maps APIを使用しています。


## デモ
- クイズに正解したとき
![Correct Image](https://github.com/wakashiyo/GeocordGuessr/assets/129835423/4be78045-a4f7-4193-b700-16410d06c0e7)

- 間違えたとき
![Wrong Image](https://github.com/wakashiyo/GeocordGuessr/assets/129835423/61e741e4-34f3-40bb-beb9-63b13417a979)

- エラーになったとき
![Error Image](https://github.com/wakashiyo/GeocordGuessr/assets/129835423/26a54cb3-500b-40e0-b8a9-33db2c619a6a)

## 不具合・未実装の機能
- APIの特性上、海上や国として登録されていない場所などが座標として指定されてしまった場合、エラーとして返されます。

