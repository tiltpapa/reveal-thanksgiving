/**
 * Quagga連携プラグイン
 * qキーで直近の集計データを取得し、選択肢の回答数を表示
 */

import { config } from '../config.js';

const QuaggaPlugin = () => {
  let lastData = null;

  // 直近の集計データを取得
  const fetchLastAggregate = async () => {
    if (!config.eventId) {
      console.error('エラー: EVENT_IDが設定されていません');
      return null;
    }

    console.log('データ取得中...');

    try {
      const url = config.debugMode 
        ? `https://ranking-quagga.tiltpapa.workers.dev/programs/${config.eventId}/questions/last_aggregate`
        : `${config.apiBase}/programs/${config.eventId}/questions/last_aggregate`;

      const headers = config.debugMode ? {} : {
        'Authorization': `Bearer ${config.token}`
      };

      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      lastData = data;
      console.log(`データ取得成功 (回答数: ${data.answers?.length || 0})`, data);
      return data;
    } catch (error) {
      console.error(`エラー: ${error.message}`);
      return null;
    }
  };

  // 回答数を選択肢に反映
  const applyAnswerCounts = (data) => {
    if (!data || !data.answers) {
      console.error('エラー: 回答データがありません');
      return;
    }

    // 垂直スライドも含めて現在のスライドを取得
    let currentSlide = document.querySelector('.reveal .slides section.present section.present') 
                      || document.querySelector('.reveal .slides section.present');
    
    if (!currentSlide) {
      console.warn('警告: 現在のスライドが見つかりません');
      return;
    }
    
    // 現在のスライドがanswerクラスでない場合、次のスライドを探す
    if (!currentSlide.classList.contains('answer')) {
      console.log('現在のスライドはanswerスライドではありません。次のスライドを確認します。');
      
      // 垂直スライドの場合、次の垂直スライドを探す
      let nextSlide = currentSlide.nextElementSibling;
      
      // 垂直スライドがない場合、次の水平スライドの最初の垂直スライドを探す
      if (!nextSlide) {
        const parentSection = currentSlide.parentElement;
        const nextParentSection = parentSection?.nextElementSibling;
        if (nextParentSection) {
          // 次の水平スライドに垂直スライドがあるか確認
          nextSlide = nextParentSection.querySelector('section') || nextParentSection;
        }
      }
      
      if (nextSlide && nextSlide.classList.contains('answer')) {
        currentSlide = nextSlide;
        console.log('次のスライドがanswerスライドです。そちらに反映します。');
      } else {
        console.warn('警告: 次のスライドもanswerスライドではありません', nextSlide?.className);
        return;
      }
    }

    // 選択肢の数を取得
    const choiceNumber = data.question?.choice_number || 4;
    
    // 各選択肢の回答数を集計（初期値0で初期化）
    const counts = {};
    for (let i = 1; i <= choiceNumber; i++) {
      counts[i] = 0;
    }
    
    data.answers.forEach(answer => {
      const choices = answer.answer.toString().split(',').map(c => c.trim());
      choices.forEach(choice => {
        if (choice) {
          const choiceNum = parseInt(choice, 10);
          if (!isNaN(choiceNum) && choiceNum >= 1 && choiceNum <= choiceNumber) {
            counts[choiceNum] = (counts[choiceNum] || 0) + 1;
          }
        }
      });
    });

    // スタイルシートに動的にルールを追加
    let styleSheet = document.getElementById('quagga-answer-counts');
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'quagga-answer-counts';
      document.head.appendChild(styleSheet);
    }

    // CSSルールを生成（既存の::afterスタイルを上書き）
    const rules = [];
    for (let i = 1; i <= choiceNumber; i++) {
      const count = counts[i];
      rules.push(`.answer li:nth-child(${i})::after { content: "${count}"; }`);
    }

    styleSheet.textContent = rules.join('\n');
    console.log(`回答数を反映しました (選択肢数: ${choiceNumber})`, counts);
  };

  // キーボードイベントハンドラー
  const handleKeyPress = async (event) => {
    if (event.key === 'q' || event.key === 'Q') {
      const data = await fetchLastAggregate();
      if (data) {
        applyAnswerCounts(data);
      }
    }
  };

  return {
    id: 'quagga',
    
    init: async (reveal) => {
      // キーボードイベントを登録
      document.addEventListener('keydown', handleKeyPress);
      
      console.log('Quaggaプラグイン初期化完了', {
        eventId: config.eventId,
        debugMode: config.debugMode
      });
    }
  };
};

export default QuaggaPlugin;
