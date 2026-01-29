/**
 * Quagga連携設定（サンプル）
 * このファイルをconfig.jsにコピーして使用してください
 */

export const config = {
  // アクセストークン
  token: 'quaggaAccess...',
  
  // イベントID
  eventId: '9999',
  
  // デバッグモード（trueでモックAPI使用、アクセストークンは送信されません）
  debugMode: true,
  
  // APIベースURL
  apiBase: 'https://quagga.studio/api/v1',
  
  // ランキングにて一画面に収める人数
  countOneScreen: 10
};
