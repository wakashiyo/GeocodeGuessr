# Geocord Guessr
 Google Maps PlattformのGeocoding APIを使って、座標からその国を当てるというチャットボットのゲームを作成しました。


## 概要
 大学の授業の最終課題として、チャットツールの「direct」で動くチャットボットを作成しました。
 node.jsを使ってプログラミングし、そのほかにGoogle Maps APIを使用しています。


## デモ
- クイズに正解したとき
![Correct Image](https://github.com/wakashiyo/GeocordGuessr/assets/129835423/4c592f21-27b7-474d-a55e-4b1bf75d6f07)

- 間違えたとき
![Wrong Image](https://github.com/wakashiyo/GeocordGuessr/assets/129835423/79ac6616-3920-4f2c-aa3a-72d57dd2fc04)

- エラーになったとき
![Error Image](https://github.com/wakashiyo/GeocordGuessr/assets/129835423/6ba91799-38a1-472a-9421-e1952477e8c4)

## 不具合・未実装の機能
- APIの特性上、海上や国として登録されていない場所などが座標として指定されてしまった場合、エラーとして返されます。

