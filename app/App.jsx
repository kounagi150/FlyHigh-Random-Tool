import React, { useState } from 'react';

// スマブラSPファイター全リスト
const INITIAL_FIGHTERS = [
  { id: 1, name: 'マリオ' },
  { id: 2, name: 'ドンキーコング' },
  { id: 3, name: 'リンク' },
  { id: 4, name: 'サムス' },
  { id: 5, name: 'ダークサムス' },
  { id: 6, name: 'ヨッシー' },
  { id: 7, name: 'カービィ' },
  { id: 8, name: 'フォックス' },
  { id: 9, name: 'ピカチュウ' },
  { id: 10, name: 'ルイージ' },
  { id: 11, name: 'ネス' },
  { id: 12, name: 'キャプテン・ファルコン' },
  { id: 13, name: 'プリン' },
  { id: 14, name: 'ピーチ' },
  { id: 15, name: 'デイジー' },
  { id: 16, name: 'クッパ' },
  { id: 17, name: 'アイスクライマー' },
  { id: 18, name: 'シーク' },
  { id: 19, name: 'ゼルダ' },
  { id: 20, name: 'ドクターマリオ' },
  { id: 21, name: 'ピチュー' },
  { id: 22, name: 'ファルコ' },
  { id: 23, name: 'マルス' },
  { id: 24, name: 'ルキナ' },
  { id: 25, name: 'こどもリンク' },
  { id: 26, name: 'ガノンドロフ' },
  { id: 27, name: 'ミュウツー' },
  { id: 28, name: 'ロイ' },
  { id: 29, name: 'クロム' },
  { id: 30, name: 'Mr.ゲーム&ウォッチ' },
  { id: 31, name: 'メタナイト' },
  { id: 32, name: 'ピット' },
  { id: 33, name: 'ブラックピット' },
  { id: 34, name: 'ゼロスーツサムス' },
  { id: 35, name: 'ワリオ' },
  { id: 36, name: 'スネーク' },
  { id: 37, name: 'アイク' },
  { id: 38, name: 'ポケモントレーナー' },
  { id: 39, name: 'ディディーコング' },
  { id: 40, name: 'リュカ' },
  { id: 41, name: 'ソニック' },
  { id: 42, name: 'デデデ' },
  { id: 43, name: 'ピクミン&オリマー' },
  { id: 44, name: 'ルカリオ' },
  { id: 45, name: 'ロボット' },
  { id: 46, name: 'トゥーンリンク' },
  { id: 47, name: 'ウルフ' },
  { id: 48, name: 'むらびと' },
  { id: 49, name: 'ロックマン' },
  { id: 50, name: 'Wii Fit トレーナー' },
  { id: 51, name: 'ロゼッタ&チコ' },
  { id: 52, name: 'リトル・マック' },
  { id: 53, name: 'ゲッコウガ' },
  { id: 54, name: 'Miiファイター' },
  { id: 55, name: 'パルテナ' },
  { id: 56, name: 'パックマン' },
  { id: 57, name: 'ルフレ' },
  { id: 58, name: 'シュルク' },
  { id: 59, name: 'クッパJr.' },
  { id: 60, name: 'ダックハント' },
  { id: 61, name: 'リュウ' },
  { id: 62, name: 'ケン' },
  { id: 63, name: 'クラウド' },
  { id: 64, name: 'カムイ' },
  { id: 65, name: 'ベヨネッタ' },
  { id: 66, name: 'インクリング' },
  { id: 67, name: 'リドリー' },
  { id: 68, name: 'シモン' },
  { id: 69, name: 'リヒター' },
  { id: 70, name: 'キングクルール' },
  { id: 71, name: 'しずえ' },
  { id: 72, name: 'ガオガエン' },
  { id: 73, name: 'パックンフラワー' },
  { id: 74, name: 'ジョーカー' },
  { id: 75, name: '勇者' },
  { id: 76, name: 'バンジョー&カズーイ' },
  { id: 77, name: 'テリー' },
  { id: 78, name: 'ベレト/ベレス' },
  { id: 79, name: 'ミェンミェン' },
  { id: 80, name: 'スティーブ/アレックス' },
  { id: 81, name: 'セフィロス' },
  { id: 82, name: 'ホムラ/ヒカリ' },
  { id: 83, name: 'カズヤ' },
  { id: 84, name: 'ソラ' },
];

export default function App() {
  // weight を { player1, player2 } のオブジェクトに変更
  const [fighters, setFighters] = useState(
    INITIAL_FIGHTERS.map(f => ({ ...f, weight: { player1: 5, player2: 5 } }))
  );
  
  const [selectedFighter1, setSelectedFighter1] = useState(null);
  const [selectedFighter2, setSelectedFighter2] = useState(null);
  const [isShowingResult, setIsShowingResult] = useState(false);

  // プレイヤーごとに比率を更新
  const handleWeightChange = (id, player, weight) => {
    setFighters(
      fighters.map(f => {
        if (f.id === id) {
          return {
            ...f,
            weight: {
              ...f.weight,
              [player]: parseInt(weight, 10)
            }
          };
        }
        return f;
      })
    );
  };

  // カード名クリックでトグル (両プレイヤー共に 0 <-> 5)
  const handleCardToggle = (id) => {
    setFighters(
      fighters.map(f => {
        if (f.id === id) {
          const isOff = f.weight.player1 === 0 && f.weight.player2 === 0;
          return {
            ...f,
            weight: {
              player1: isOff ? 5 : 0,
              player2: isOff ? 5 : 0
            }
          };
        }
        return f;
      })
    );
  };

  // すべて5にリセット
  const handleReset = () => {
    setFighters(
      fighters.map(f => ({ ...f, weight: { player1: 5, player2: 5 } }))
    );
    setIsShowingResult(false);
  };

  // すべてOFF
  const handleAllOff = () => {
    setFighters(
      fighters.map(f => ({ ...f, weight: { player1: 0, player2: 0 } }))
    );
    setIsShowingResult(false);
  };

  // プレイヤーごとの重み付き抽選ロジック
  const handleOmakase = () => {
    // 選択されたプレイヤーを確認（ボタンから判定）
    // 現在は両プレイヤーの抽選を行う
    selectPlayers();
  };

  // プレイヤーの選出処理
  const selectPlayers = () => {
    // player1の比率 > 0 のキャラクターを抽出
    const candidates1 = fighters.filter(f => f.weight.player1 > 0);
    // player2の比率 > 0 のキャラクターを抽出
    const candidates2 = fighters.filter(f => f.weight.player2 > 0);

    if (candidates1.length === 0 || candidates2.length === 0) {
      alert('両プレイヤーで比率が0より大きいキャラクターを選択してください！');
      return;
    }

    if (candidates1.length === 1 && candidates2.length === 1 && candidates1[0].id === candidates2[0].id) {
      alert('異なるキャラクターを選出できる設定にしてください！');
      return;
    }

    // プレイヤー1を選出（player1の比率に基づいて）
    const totalWeight1 = candidates1.reduce((sum, f) => sum + f.weight.player1, 0);
    let randomNumber1 = Math.floor(Math.random() * totalWeight1) + 1;
    let currentWeightSum = 0;
    let selected1 = null;
    for (const fighter of candidates1) {
      currentWeightSum += fighter.weight.player1;
      if (randomNumber1 <= currentWeightSum) {
        selected1 = fighter;
        break;
      }
    }

    // プレイヤー2を選出（player2の比率に基づいて、プレイヤー1と異なるキャラクター）
    const candidates2Filtered = candidates2.filter(f => f.id !== selected1.id);
    if (candidates2Filtered.length === 0) {
      alert('プレイヤー2で異なるキャラクターが選出できる設定にしてください！');
      return;
    }

    const totalWeight2 = candidates2Filtered.reduce((sum, f) => sum + f.weight.player2, 0);
    let randomNumber2 = Math.floor(Math.random() * totalWeight2) + 1;
    currentWeightSum = 0;
    let selected2 = null;
    for (const fighter of candidates2Filtered) {
      currentWeightSum += fighter.weight.player2;
      if (randomNumber2 <= currentWeightSum) {
        selected2 = fighter;
        break;
      }
    }

    setSelectedFighter1(selected1);
    setSelectedFighter2(selected2);
    setIsShowingResult(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsShowingResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b-2 border-orange-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            {/* 中央：タイトル */}
            <div className="flex-1 flex items-center justify-center gap-4">
              <img src="/FHTxt_touka.png" alt="FlyHigh" className="h-16 w-auto" />
              <p className="text-xl font-bold text-gray-700">Omakase Tool</p>
            </div>
            {/* 右上：ロゴ（サイズ拡大） */}
            <img src="/FHtouka.png" alt="FlyHigh Logo" className="h-20 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* グローバルコントロール */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* 左側：ボタン群 */}
            <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-md"
              >
                🔄 すべて5
              </button>
              <button
                onClick={handleAllOff}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-all shadow-md"
              >
                ⊗ すべてOFF
              </button>
            </div>

            {/* 右側：おまかせボタン（目立つ） */}
            <button
              onClick={handleOmakase}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl rounded-lg hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              🎮 おまかせ！
            </button>
          </div>
        </div>

        {/* キャラクターグリッド */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">キャラクター設定</h2>
          
          {/* デスクトップ版（lg以上）：グリッド表示 */}
          <div className="hidden lg:grid grid-cols-8 gap-4">
            {fighters.map(fighter => (
              <div
                key={fighter.id}
                onClick={() => handleCardToggle(fighter.id)}
                className={`p-4 rounded-lg shadow-md border-2 cursor-pointer transition-all hover:shadow-lg ${
                  fighter.weight.player1 === 0 && fighter.weight.player2 === 0
                    ? 'border-gray-300 bg-gray-50 opacity-40 grayscale'
                    : 'border-orange-400 bg-orange-50 hover:border-orange-500'
                }`}
              >
                {/* キャラ名 */}
                <p className="text-sm font-bold text-center text-gray-800 mb-3 truncate">
                  {fighter.name}
                </p>

                {/* プレイヤー1の比率入力 */}
                <div className="mb-2">
                  <label className="text-xs font-bold text-blue-600">P1比率</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={fighter.weight.player1}
                    onChange={(e) => handleWeightChange(fighter.id, 'player1', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-2 py-1 text-center text-sm font-bold border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900"
                    disabled={fighter.weight.player1 === 0 && fighter.weight.player2 === 0}
                  />
                </div>

                {/* プレイヤー2の比率入力 */}
                <div>
                  <label className="text-xs font-bold text-red-600">P2比率</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={fighter.weight.player2}
                    onChange={(e) => handleWeightChange(fighter.id, 'player2', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-2 py-1 text-center text-sm font-bold border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-red-900"
                    disabled={fighter.weight.player1 === 0 && fighter.weight.player2 === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* タブレット版（md～lg）：3-6列グリッド表示 */}
          <div className="hidden md:grid lg:hidden grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {fighters.map(fighter => (
              <div
                key={fighter.id}
                onClick={() => handleCardToggle(fighter.id)}
                className={`p-4 rounded-lg shadow-md border-2 cursor-pointer transition-all hover:shadow-lg ${
                  fighter.weight.player1 === 0 && fighter.weight.player2 === 0
                    ? 'border-gray-300 bg-gray-50 opacity-40 grayscale'
                    : 'border-orange-400 bg-orange-50 hover:border-orange-500'
                }`}
              >
                {/* キャラ名 */}
                <p className="text-sm font-bold text-center text-gray-800 mb-3 truncate">
                  {fighter.name}
                </p>

                {/* プレイヤー1の比率入力 */}
                <div className="mb-2">
                  <label className="text-xs font-bold text-blue-600">P1</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={fighter.weight.player1}
                    onChange={(e) => handleWeightChange(fighter.id, 'player1', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-2 py-1 text-center text-sm font-bold border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900"
                    disabled={fighter.weight.player1 === 0 && fighter.weight.player2 === 0}
                  />
                </div>

                {/* プレイヤー2の比率入力 */}
                <div>
                  <label className="text-xs font-bold text-red-600">P2</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={fighter.weight.player2}
                    onChange={(e) => handleWeightChange(fighter.id, 'player2', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-2 py-1 text-center text-sm font-bold border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-red-900"
                    disabled={fighter.weight.player1 === 0 && fighter.weight.player2 === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* スマホ版（md未満）：グリッド + スライダー表示 */}
          <div className="md:hidden grid grid-cols-3 gap-4">
            {fighters.map(fighter => (
              <div
                key={fighter.id}
                className={`p-4 rounded-lg shadow-md border-2 transition-all ${
                  fighter.weight.player1 === 0 && fighter.weight.player2 === 0
                    ? 'border-gray-300 bg-gray-50 opacity-40 grayscale'
                    : 'border-orange-400 bg-orange-50'
                }`}
              >
                {/* キャラ名 */}
                <p className="text-sm font-bold text-center text-gray-800 mb-3 truncate">
                  {fighter.name}
                </p>

                {/* プレイヤー1のスライダー */}
                <div className="mb-2">
                  <label className="text-xs font-bold text-blue-600">P1:</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={fighter.weight.player1}
                    onChange={(e) => handleWeightChange(fighter.id, 'player1', e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: fighter.weight.player1 === 0 
                        ? '#d1d5db' 
                        : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${fighter.weight.player1 * 10}%, #e5e7eb ${fighter.weight.player1 * 10}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="text-center text-xs font-bold text-blue-700">{fighter.weight.player1}</div>
                </div>

                {/* プレイヤー2のスライダー */}
                <div className="mb-2">
                  <label className="text-xs font-bold text-red-600">P2:</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={fighter.weight.player2}
                    onChange={(e) => handleWeightChange(fighter.id, 'player2', e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: fighter.weight.player2 === 0 
                        ? '#d1d5db' 
                        : `linear-gradient(to right, #ef4444 0%, #ef4444 ${fighter.weight.player2 * 10}%, #e5e7eb ${fighter.weight.player2 * 10}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="text-center text-xs font-bold text-red-700">{fighter.weight.player2}</div>
                </div>

                {/* トグルボタン */}
                <button
                  onClick={() => handleCardToggle(fighter.id)}
                  className="w-full mt-2 text-xs font-bold py-1 px-2 rounded transition-all"
                  style={{
                    backgroundColor: fighter.weight.player1 === 0 && fighter.weight.player2 === 0 ? '#fed7aa' : '#fef3c7',
                    color: fighter.weight.player1 === 0 && fighter.weight.player2 === 0 ? '#92400e' : '#78350f'
                  }}
                >
                  {fighter.weight.player1 === 0 && fighter.weight.player2 === 0 ? 'ON' : 'OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* モーダル（結果表示） */}
      {isShowingResult && selectedFighter1 && selectedFighter2 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center transform transition-all">
            <p className="text-gray-600 text-lg mb-6">対戦カード</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* プレイヤー1 */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <p className="text-sm font-bold text-blue-600 mb-2">Player 1</p>
                <h2 className="text-5xl font-black text-blue-600">
                  {selectedFighter1.name}
                </h2>
              </div>
              {/* プレイヤー2 */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
                <p className="text-sm font-bold text-red-600 mb-2">Player 2</p>
                <h2 className="text-5xl font-black text-red-600">
                  {selectedFighter2.name}
                </h2>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
