# memo

## 目的

- 日々のやったこと・それからわかったことを記録の管理を行う小規模システムを作る

## 要件

- やったことや分かったことに、学んだこと・楽しかったことなどタグ付けが出来る（タグは０個以上つけることが出来る）
- タグごとに表示ができる
- 検索して、表示することが出来る。ユーザーで絞り込んで。指定がなければ全員（曜日順で）
- 入力時刻が自動で入る（年月日・曜日まで）
- ユーザー名が自動で入る

## テーブル一覧

| name     | description                                                              | note                           |
| :------- | :--------------------------------------------------------------------- | :----------------------------- |
| users    | ユーザーの名前                                              |
| stickies | 作ったユーザー・内容・タグなど、付箋のこと・追加された部屋・座標の管理 |
| owners   | 作ったユーザーと作ったボードの管理                                     |
| boards   | 各部屋に参加しているメンバーの管理                                     | 退室者は物理削除でいいと思う。 |

### 関連

```puml
@startuml
    entity "users" as users <<M, MASTER_MARK_COLOR>>{
        + ユーザーID [PK]
        --
        ユーザー名
        設定色
    }

    entity "stickies" as stickies <<T, MASTER_MARK_COLOR>>{
        + 付箋ID[PK]
        --
        内容
        ユーザーID
        タグ
        ボードID
        座標
    }

    entity "boards" as boards <<T, MASTER_MARK_COLOR>>{
        + ボードID[PK]
        --
        オーナーID
        ユーザーID
        合言葉
    }

    stickies }o--- boards
    users ---o{ boards
    users ---o{ stickies
@enduml
```

