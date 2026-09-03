# 画像一覧（差し替え済み）

現在このフォルダの写真がサイトに反映されています。等高線プレースホルダは
実写真（`<img>`）に置き換え済みです。写真を更新する場合は同じファイル名で上書きしてください。

サイトは1ページ構成（LP）です。すべて index.html 内で使用します。

## 現在の使用ファイル
| ファイル | 使用セクション |
|---|---|
| ph-hero-survey.jpg | ヒーロー |
| ph-boundary-marker.jpg | お悩みセクション（#concerns） |
| svc-survey / svc-land / svc-building / svc-boundary.jpg | 業務カード ×4（背景・#services） |
| svcdetail-survey / svcdetail-land / svcdetail-building / svcdetail-boundary.jpg | 業務の詳細ブロック ×4（#svc-survey 等） |
| ph-process-fieldwork.jpg | ご相談の流れの帯（#flow） |
| ph-office-portrait / ph-office-exterior / ph-office-drawings.jpg | 事務所紹介（#about） |
| ph-portrait-face.jpg | 予備（未使用。代表者の顔写真を出す場合に #about のメインと差し替え） |
| ph-case-inherited-land / ph-case-newhouse / ph-case-boundary-check.jpg | ご相談の多いケース ×3（#faq） |

---

## （参考）当初の撮影意図・推奨サイズ

## トップページ（index.html）
| 箇所 | 推奨内容 | 目安サイズ（横×縦） |
|---|---|---|
| ヒーロー右 | 測量作業中の様子（トータルステーション等） | 900 × 1000 |
| お悩みセクション左 | 境界標のクローズアップ | 900 × 1100 |
| 業務カード ×4 | 測量風景／公図・図面／住宅外観／打ち合わせ | 各 800 × 600 |
| 流れセクション下 | 現地測量の全景 | 1600 × 600 |
| 事務所紹介 | 代表者の執務風景（メイン）／事務所外観／図面と道具 | 900×1100・700×800・700×500 |
| ご相談ケース ×3 | 郡山の宅地／新築住宅／現地確認 | 各 900 × 600 |

## 各下層ページ
- services.html: 各業務グループにイメージ写真を足すと説得力が増します（任意）。
- about.html: 代表者の顔写真・経歴・登録番号を掲載（現在は「ヒアリング後に掲載」表示）。
- access.html: 正確な地図は Google Maps 等の埋め込みに差し替え。現在は簡易 SVG 図。

## 差し替え方法
`<figure class="ph ...">...</figure>` を
`<figure class="ph"><img src="assets/img/xxxx.webp" alt="..."></figure>` に置き換え、
`.ph img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }` を
styles.css に追記すれば、レイアウトを保ったまま写真が入ります。

## 未確定情報（デモでは点線プレースホルダ表示）
代表者名・経歴・土地家屋調査士 登録番号・所属会・営業時間・定休日・駐車場・受付時間・
具体的な対応エリア・料金の目安。ヒアリングで確認のうえ掲載してください。
