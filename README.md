# こむぎOFF習慣

小麦・砂糖断ちを「罪悪感ゼロ」で続けるための iOS 向け Expo アプリです。

## できること（MVP）
- オンボーディング → ホーム → チェックイン → ふりかえり の導線
- Streak（連続OFF）とマイルストーン表示
- こむぎ判定「たぶん大丈夫仕分け」
- 応援者モード（同一端末内のダミー応援）
- ローカル SQLite 保存
- 買い切り/サブスク Paywall（Restore / 管理導線付き）

## 起動手順
```bash
npm install
npm run start
```

### iOS 実機での確認
- Expo Go をインストール
- `npm run start` で表示された QR を読み取って確認

## テスト
```bash
npm test
```

## IAP 設定メモ
- 買い切り: `komugi_off_lifetime_650`
- 月額: `komugi_off_monthly_300`
- Family Sharing を有効化した場合は購入履歴から権利判定を行います。

## レビュー用注意文
- 本アプリは医療助言ではありません。必要に応じて医師に相談してください。

## GitHub Actions
- `lint` と `test` のみを実行します。
