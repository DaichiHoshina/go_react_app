export const sideBarWidth = 230;
export const sideBarNoticeWidth = 230;
export const noticeList = [
  //ダミーデータ
  {
    title: 'お知らせ',
    content: 'お知らせのテスト文章です。',
    createdAt: '(2020-10-10 20:00:00)',
    category: 'notice',
  },
  {
    title: '今日のメモ',
    content: '今日のメモのテスト文章です。',
    createdAt: '(2020-10-10 20:00:00)',
    category: 'memo',
  },
  {
    title: 'カレンダーメモ',
    content: 'カレンダーメモのテスト文章です。',
    createdAt: '(2020-10-10 20:00:00)',
    category: 'calendar',
  },
];

export const prefInfo = [
  // 未選択の場合のテキストは、セレクトボックスの内容によって各コンポーネントで設定している。
  // { value: '', label: '(全て)' },
  // { value: '', label: '(未選択)' },
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '岩手県', label: '岩手県' },
  { value: '宮城県', label: '宮城県' },
  { value: '秋田県', label: '秋田県' },
  { value: '山形県', label: '山形県' },
  { value: '福島県', label: '福島県' },
  { value: '茨城県', label: '茨城県' },
  { value: '栃木県', label: '栃木県' },
  { value: '群馬県', label: '群馬県' },
  { value: '埼玉県', label: '埼玉県' },
  { value: '千葉県', label: '千葉県' },
  { value: '東京都', label: '東京都' },
  { value: '神奈川県', label: '神奈川県' },
  { value: '新潟県', label: '新潟県' },
  { value: '富山県', label: '富山県' },
  { value: '石川県', label: '石川県' },
  { value: '福井県', label: '福井県' },
  { value: '山梨県', label: '山梨県' },
  { value: '長野県', label: '長野県' },
  { value: '岐阜県', label: '岐阜県' },
  { value: '静岡県', label: '静岡県' },
  { value: '愛知県', label: '愛知県' },
  { value: '三重県', label: '三重県' },
  { value: '滋賀県', label: '滋賀県' },
  { value: '京都府', label: '京都府' },
  { value: '大阪府', label: '大阪府' },
  { value: '兵庫県', label: '兵庫県' },
  { value: '奈良県', label: '奈良県' },
  { value: '和歌山県', label: '和歌山県' },
  { value: '鳥取県', label: '鳥取県' },
  { value: '島根県', label: '島根県' },
  { value: '岡山県', label: '岡山県' },
  { value: '広島県', label: '広島県' },
  { value: '山口県', label: '山口県' },
  { value: '徳島県', label: '徳島県' },
  { value: '香川県', label: '香川県' },
  { value: '愛媛県', label: '愛媛県' },
  { value: '高知県', label: '高知県' },
  { value: '福岡県', label: '福岡県' },
  { value: '佐賀県', label: '佐賀県' },
  { value: '長崎県', label: '長崎県' },
  { value: '熊本県', label: '熊本県' },
  { value: '大分県', label: '大分県' },
  { value: '宮崎県', label: '宮崎県' },
  { value: '鹿児島県', label: '鹿児島県' },
  { value: '沖縄県', label: '沖縄県' },
];

// 複数定義して少しややこしくしている気がする。
export const enumAspAuthCdString = {
  asp_administrator: 'ASP管理者',
  medical_org_supporter: '医療機関支援者',
};

export const enumAspAuthCd = {
  asp_administrator: '10',
  medical_org_supporter: '13',
};

export const aspAuthCdSelectMenuItems = [
  { label: '(未選択)', value: '' },
  { label: 'ASP管理者', value: '10' },
  { label: '医療機関支援者', value: '13' },
];

export const canDownloadCountMenuItems = [
  { value: '-', label: '指定なし' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
  { value: '50', label: '50' },
];

export const dummyWebReservationTypeCdMenuItems = [
  { label: '利用しない', value: '0' },
  { label: '未会員予約', value: '1' },
  { label: '予約後利用者登録', value: '2' },
];

export const operationalInfoNotificationTargetMenuItems = [
  { label: '医院向け', value: '1' },
  { label: '利用者向け', value: '2' },
];
