/**
 * 教育部因材網時空學園 互動式使用者操作手冊 - 完整章節與測驗資料
 * 內容對應官方 73 頁使用者操作手冊，全站採用 Font Awesome 圖示
 */

window.MANUAL_CHAPTERS = [
  {
    id: 'ch-login',
    num: '01',
    title: '登入教學',
    subtitle: '由官網與因材網快速進入時空學園',
    icon: 'fa-solid fa-right-to-bracket',
    color: '#00f5ff',
    accent: 'linear-gradient(135deg, #00f5ff, #3b82f6)',
    badgeName: '時空通行證',
    highlights: [
      '官網一鍵進入遊戲',
      '因材網一般帳號登入',
      '縣市與學校快速確認',
      '區分教師與學生帳號畫面'
    ],
    steps: [
      {
        tab: '登入總覽',
        page: 'P.3',
        title: '因材網及官網登入流程總覽',
        bullets: [
          '由時空學園官方網站進入登入入口頁面。',
          '選擇「由因材網登入遊戲」，依序確認所屬縣市與學校，再輸入帳號與密碼。',
          '學生完成驗證後即可直接進入時空學園展開冒險。'
        ],
        tip: '建議使用平板或桌機現代瀏覽器，登入更順暢！',
        images: [
          { src: 'image/manual/image2.webp', caption: '時空學園登入流程概覽' }
        ]
      },
      {
        tab: '官網入口三步驟',
        page: 'P.4',
        title: '搜尋官網並點選因材網登入',
        bullets: [
          '步驟 1：搜尋「時空學園」進入官方網站，點選【馬上進入遊戲】。',
          '步驟 2：於登入選項中點選【由因材網登入遊戲】。',
          '步驟 3：選擇【因材網-一般帳號登入】進行身分驗證。'
        ],
        tip: '若已在瀏覽器登入過教育部因材網，系統可快速帶入登入狀態。',
        images: [
          { src: 'image/manual/image3.webp', caption: '步驟 1：官網點選馬上進入遊戲' },
          { src: 'image/manual/image5.webp', caption: '步驟 2：由因材網登入遊戲' },
          { src: 'image/manual/image4.webp', caption: '步驟 3：因材網-一般帳號登入' }
        ]
      },
      {
        tab: '縣市與合作學校',
        page: 'P.5',
        title: '選擇所屬縣市、行政區與學校',
        bullets: [
          '依序選擇所在縣市、行政區與就讀/任教學校。',
          '內部人員登入路徑範例：臺中市 > 西區 > 計畫合作學校。',
          '確認學校無誤後輸入因材網帳號及密碼即可登入。'
        ],
        tip: '請務必確認縣市與校名正確，避免帳號綁定錯誤。',
        images: [
          { src: 'image/manual/image6.webp', caption: '縣市與學校選擇畫面' }
        ]
      },
      {
        tab: '教師與學生介面差異',
        page: 'P.6',
        title: '教師帳號與學生帳號登入後差異',
        bullets: [
          '學生帳號：驗證通過後會直接進入時空學園大廳。',
          '教師帳號：登入時會出現專屬選擇項目，方便教師進行教學演示與難度調整。'
        ],
        tip: '教師帳號進入後可在「設定」中自由切換導師等級（對應不同年級題庫）。',
        images: [
          { src: 'image/manual/image7.webp', caption: '教師帳號專屬選項說明' }
        ]
      }
    ]
  },
  {
    id: 'ch-lobby',
    num: '02',
    title: '大廳功能',
    subtitle: '信件、設定、官網、海報與排行榜一次掌握',
    icon: 'fa-solid fa-house-chimney-window',
    color: '#a855f7',
    accent: 'linear-gradient(135deg, #a855f7, #ec4899)',
    badgeName: '星際大廳領航員',
    simulator: 'lobby',
    highlights: [
      '信件領取活動獎勵',
      '設定注音/字體/音效/畫質',
      '官方網站即時公告',
      '大廳海報與全校排行榜'
    ],
    steps: [
      {
        tab: '大廳主頁面',
        page: 'P.7',
        title: '大廳五大核心功能總覽',
        bullets: [
          '01 信件：查看活動獎勵品及最新活動資訊。',
          '02 設定：調整注音、字體、音樂音效與導師等級等選項。',
          '03 官方網站：活動與系統公告同步更新。',
          '04 海報：大廳即時輪播活動與公告海報圖。',
          '05 排行榜：查看各校師生與玩家的總名次排行。'
        ],
        tip: '記得每次登入都先點開「信件」，才不會錯過限時發放的獎勵喔！',
        images: [
          { src: 'image/manual/image8.webp', caption: '時空學園大廳主頁面全覽' }
        ]
      },
      {
        tab: '信件中心',
        page: 'P.8',
        title: '查看信件與領取活動獎勵',
        bullets: [
          '點選大廳「信件」圖示即可開啟信箱。',
          '所有活動獎勵品、排行榜獎勵與官方活動資訊皆會寄送至此。'
        ],
        tip: '看到信件圖示亮起紅點時，代表有新獎勵等你領取！',
        images: [
          { src: 'image/manual/image10.webp', caption: '大廳功能按鈕位置' },
          { src: 'image/manual/image9.webp', caption: '信件介面與獎勵領取' }
        ]
      },
      {
        tab: '系統設定',
        page: 'P.9',
        title: '無障礙注音、視聽畫質與導師等級',
        bullets: [
          '可自由開啟「注音輔助」、調整字體大小、背景音樂、音效與畫面畫質。',
          '可查看或調整「導師等級」，導師等級會直接影響抽到的題目難度。',
          '權限提醒：只有「教師帳號」可以手動調整導師等級；學生帳號會依據學校年級自動綁定。'
        ],
        tip: '低年級同學非常推薦開啟「注音」功能，閱讀題目更輕鬆！',
        images: [
          { src: 'image/manual/image11.webp', caption: '系統設定與導師等級選項' }
        ]
      },
      {
        tab: '官網與海報',
        page: 'P.10-11',
        title: '官方網站連結與遊戲內海報牆',
        bullets: [
          '官方網站（P.10）：最新大型活動與系統更新公告會同步發布於官網。',
          '海報（P.11）：在大廳中點擊海報即可快速瀏覽當期遊戲內活動與公告圖。'
        ],
        tip: '想搶先知道期間限定星球何時開放？多留意海報與官網就對了！',
        images: [
          { src: 'image/manual/image12.webp', caption: '官方網站活動公告' },
          { src: 'image/manual/image13.webp', caption: '大廳活動海報畫面' }
        ]
      },
      {
        tab: '全服排行榜',
        page: 'P.12',
        title: '各校師生與玩家總名次排行榜',
        bullets: [
          '點選「排行榜」即可查看各校師生與所有玩家的即時總名次。',
          '激勵同學挑戰更高積分，為自己與學校爭取榮譽！'
        ],
        tip: '下方可直接體驗「大廳熱點互動模擬器」，親手點點看五大功能！',
        images: [
          { src: 'image/manual/image14.webp', caption: '各校師生與玩家排行榜' }
        ]
      }
    ]
  },
  {
    id: 'ch-stage-search',
    num: '03',
    title: '關卡碼搜尋',
    subtitle: '輸入關卡碼、掃描 QR Code 或依年級學科秒速開局',
    icon: 'fa-solid fa-qrcode',
    color: '#22c55e',
    accent: 'linear-gradient(135deg, #22c55e, #00f5ff)',
    badgeName: '精準雷達獵手',
    simulator: 'search',
    highlights: [
      '首頁新整合模式入口',
      '輸入關卡碼或關卡名稱',
      '平板掃描或匯入 QR Code',
      '年級與主要學科精準篩選'
    ],
    steps: [
      {
        tab: '搜尋整合總覽',
        page: 'P.13-14',
        title: '全新首頁整合與四大快速入口',
        bullets: [
          '玩法整合優化：將「單人／組隊冒險、限時活動、黑洞」全部統一至首頁，介面更直覺易懂。',
          '首頁上方直接支援輸入「關卡碼」或「關卡名稱」搜尋。',
          '亦支援「年級與主要學科篩選」及「QR Code 掃描／圖片匯入」，找到後立即遊玩！'
        ],
        tip: '老師上課派發指定單元時，只要分享關卡碼或 QR Code，全班 3 秒就能進入同一關！',
        images: [
          { src: 'image/manual/image15.webp', caption: '關卡碼搜尋功能總覽' },
          { src: 'image/manual/image16.webp', caption: '新頁面更新：玩法整合至首頁' }
        ]
      },
      {
        tab: '名稱與關卡碼搜尋',
        page: 'P.15-16',
        title: '輸入關鍵字查詢（例如：自由女神像）',
        bullets: [
          '直接在首頁搜尋列輸入關卡碼或關鍵字，例如輸入「自由女神像」。',
          '在搜尋結果列表中點選想挑戰的遊戲名稱，即可立刻開始遊玩。'
        ],
        tip: '不記得完整名稱也沒關係，輸入核心關鍵字就能模糊比對喔！',
        images: [
          { src: 'image/manual/image19.webp', caption: '於首頁搜尋欄輸入關鍵字' },
          { src: 'image/manual/image21.webp', caption: '選擇搜尋到的關卡開始遊玩' }
        ]
      },
      {
        tab: 'QR Code 掃描導入',
        page: 'P.17',
        title: '平板相機掃描或從相簿匯入 QR Code',
        bullets: [
          '方式 1：使用平板相機直接掃描該題目的 QR Code，立即進入遊玩。',
          '方式 2：若是電腦版或已儲存圖片，可下載 QR Code 後由「圖片導入」快速開啟關卡。'
        ],
        tip: '非常適合學習單印製或投影在教室大螢幕讓學生秒速掃描！',
        images: [
          { src: 'image/manual/image23.webp', caption: '開啟 QR Code 掃描入口' },
          { src: 'image/manual/image25.webp', caption: '掃描或由圖片匯入 QR Code' }
        ]
      },
      {
        tab: '年級與學科篩選',
        page: 'P.18',
        title: '不輸入文字直接搜尋，指定年級與學科',
        bullets: [
          '在搜尋欄空白狀態下直接按下「搜尋」。',
          '即可開啟篩選面板，自由指定「年級」與「主要學科」，快速瀏覽適合的題目關卡。'
        ],
        tip: '快到下方的「關卡碼與篩選模擬器」試著搜尋看看吧！',
        images: [
          { src: 'image/manual/image26.webp', caption: '年級與主要學科篩選介面' },
          { src: 'image/manual/image28.webp', caption: '篩選結果清單' }
        ]
      }
    ]
  },
  {
    id: 'ch-profile',
    num: '04',
    title: '個人頁面',
    subtitle: '學習記錄、AI導師換裝、戰寵養成、2026動態魔王與成就',
    icon: 'fa-solid fa-id-card-clip',
    color: '#ff3cac',
    accent: 'linear-gradient(135deg, #ff3cac, #784ba0)',
    badgeName: '全能收藏大師',
    highlights: [
      '學習記錄與新手任務',
      '時空導師與 AI 導師換裝',
      '教育部戰寵養成與跨界合作',
      '2026 全新動態魔王圖鑑'
    ],
    steps: [
      {
        tab: '學習記錄與新手任務',
        page: 'P.19-22',
        title: '掌握個人學習歷程與每日新手任務',
        bullets: [
          '個人頁面整合三大領域：學習記錄/知識卡、導師/戰寵/魔王戰史、成就與活動獎勵。',
          '學習記錄（P.21）：完整保存學生每一次遊玩與答題歷程。',
          '新手任務（P.22）：每天解一個小任務，循序漸進熟悉時空學園所有操作。'
        ],
        tip: '剛加入的冒險者一定要先把「新手任務」解完，獎勵超豐厚！',
        images: [
          { src: 'image/manual/image29.webp', caption: '個人頁面功能總覽' },
          { src: 'image/manual/image30.webp', caption: '學生遊玩學習記錄' },
          { src: 'image/manual/image31.webp', caption: '每日新手任務引導' }
        ]
      },
      {
        tab: '關卡與知識卡圖鑑',
        page: 'P.23-24',
        title: '查閱通關資訊與每張知識卡詳情',
        bullets: [
          '關卡圖鑑（P.23）：記錄每個關卡的通關狀態與歷史表現。',
          '知識卡圖鑑（P.24）：可點擊瀏覽每一張已收集知識卡的詳細學科資訊。'
        ],
        tip: '考前複習時，把知識卡圖鑑打開翻一翻超有幫助！',
        images: [
          { src: 'image/manual/image32.webp', caption: '關卡通關資訊總覽' },
          { src: 'image/manual/image34.webp', caption: '知識卡詳細資訊畫面' }
        ]
      },
      {
        tab: '時空導師與AI導師',
        page: 'P.25-28',
        title: '導師學科搭配加成 & AI 導師自由換裝',
        bullets: [
          '時空導師（P.25）：導師需與任務學科互相搭配，選對導師可獲得額外能力加成！',
          'AI 導師（P.26-28）：超人氣個人化功能，可自由更換 AI 導師的「背景」與「服裝穿著」，打造專屬風格！'
        ],
        tip: '搭配正確學科導師出戰，積分與答對輔助效果會大幅提升喔！',
        images: [
          { src: 'image/manual/image35.webp', caption: '時空導師學科能力一覽' },
          { src: 'image/manual/image36.webp', caption: 'AI 導師個性化設定' },
          { src: 'image/manual/image38.webp', caption: '更換 AI 導師背景與穿著' }
        ]
      },
      {
        tab: '戰寵養成與跨界合作',
        page: 'P.29-31',
        title: '內建三大教育部戰寵、升級與跨界連動',
        bullets: [
          '原始帳號預設內建「三隻教育部戰寵」，陪你一起答題闖關。',
          '戰寵取得管道多元：可用遊戲「能量購買」、參與「活動」或官方「贈送」。',
          '戰寵升級（P.30）：消耗資源升級戰寵，強化輔助能力。',
          '跨界合作戰寵（P.31）：與其他團隊合作製作的特定戰寵，還可直接連結至其他遊戲頁面！'
        ],
        tip: '新手推薦優先培養具有「關鍵字提示」技能的戰寵！',
        images: [
          { src: 'image/manual/image39.webp', caption: '內建三隻教育部戰寵' },
          { src: 'image/manual/image40.webp', caption: '戰寵升級增加能力' },
          { src: 'image/manual/image41.webp', caption: '跨團隊合作戰寵與外部遊戲連結' }
        ]
      },
      {
        tab: '2026 動態魔王圖鑑',
        page: 'P.32-33',
        title: '魔王戰史 & 2026 全新開發「動態魔王」',
        bullets: [
          '魔王戰史（P.32）：記錄你曾經成功擊敗過的每一位魔王。',
          '2026 新功能開發｜動態魔王（P.33）：全新動態演出魔王正式登場！點擊下方動態圖可放大欣賞細節。'
        ],
        tip: '這四隻是原汁原味的 2026 動態魔王實機動畫，快點放大檢視！',
        images: [
          { src: 'image/manual/image44.gif', caption: '2026 新增動態魔王 A' },
          { src: 'image/manual/image45.gif', caption: '2026 新增動態魔王 B' },
          { src: 'image/manual/image46.gif', caption: '2026 新增動態魔王 C' },
          { src: 'image/manual/image47.gif', caption: '2026 新增動態魔王 D' }
        ]
      },
      {
        tab: '成就與活動紀錄',
        page: 'P.34-36',
        title: '達成成就領獎勵 & 星球活動歷史紀錄',
        bullets: [
          '成就系統（P.34-35）：達成指定條件即可解鎖成就徽章，並領取對應豐厚獎勵。',
          '活動紀錄（P.36）：完整回顧已參加過的期間限定星球活動與曾領取的獎勵。'
        ],
        tip: '偶爾回來個人頁面檢查「成就」，常會有意想不到的能量可以領！',
        images: [
          { src: 'image/manual/image48.webp', caption: '成就系統條件清單' },
          { src: 'image/manual/image50.webp', caption: '達成成就領取對應獎勵' },
          { src: 'image/manual/image51.webp', caption: '已參加之星球活動與獎勵紀錄' }
        ]
      }
    ]
  },
  {
    id: 'ch-planet',
    num: '05',
    title: '星球活動',
    subtitle: '期間限定跨學科主題星球與排行榜榮譽獎勵',
    icon: 'fa-solid fa-earth-asia',
    color: '#10b981',
    accent: 'linear-gradient(135deg, #10b981, #06b6d4)',
    badgeName: '星際探索先鋒',
    highlights: [
      '期間限定跨學科題組',
      '點選綠色入口進入星球',
      '自由擇關出擊挑戰',
      '星球排行榜不定時發獎'
    ],
    steps: [
      {
        tab: '活動機制總覽',
        page: 'P.37',
        title: '期間限定星球活動特色',
        bullets: [
          '星球活動皆為「期間限定」，每顆星球內含不同主題的題目組合。',
          '題目涵蓋多元學科內容，並會隨季節與主題不定期更新。',
          '參加紀錄與獲得的專屬獎勵，皆可於「個人頁面」查詢。'
        ],
        tip: '期間限定星球錯過就要等下次重開，看到開放就馬上登陸吧！',
        images: [
          { src: 'image/manual/image53.webp', caption: '星球活動功能介紹' }
        ]
      },
      {
        tab: '進入與選擇關卡',
        page: 'P.38-39',
        title: '點選綠色星球入口，擇關按【出擊】',
        bullets: [
          '於大廳點選綠色按鈕，即可進入星球活動總覽頁面，挑選想玩的星球。',
          '進入星球後，擇一選擇關卡並點擊【出擊】，即可開始跨學科挑戰！'
        ],
        tip: '可以觀察每個關卡的主題提示，先挑最有把握的關卡暖身！',
        images: [
          { src: 'image/manual/image54.webp', caption: '點選綠色按鈕進入星球頁面' },
          { src: 'image/manual/image55.webp', caption: '選擇想挑戰的星球' },
          { src: 'image/manual/image56.webp', caption: '擇一關卡點選【出擊】' }
        ]
      },
      {
        tab: '星球排行榜',
        page: 'P.40',
        title: '衝刺星球排行榜贏取不定時獎勵',
        bullets: [
          '在星球頁面中可隨時點開【排行榜】查看自己目前的排名位置。',
          '成功登上排行榜的玩家，官方會不定時發放專屬獎勵至信箱！'
        ],
        tip: '反覆挑戰刷新最高積分，就有機會名列前茅拿大獎！',
        images: [
          { src: 'image/manual/image57.webp', caption: '星球專屬排行榜畫面' }
        ]
      }
    ]
  },
  {
    id: 'ch-solo',
    num: '06',
    title: '單人冒險',
    subtitle: '選導師與戰寵、拖曳知識卡擊敗魔王、星星回收機制',
    icon: 'fa-solid fa-user-astronaut',
    color: '#ef4444',
    accent: 'linear-gradient(135deg, #ff3cac, #ef4444)',
    badgeName: '魔王討伐勇者',
    simulator: 'solo',
    highlights: [
      '臺灣／世界主題雙隨機任務',
      '12 張知識卡挑出 3 張正解',
      '導師技能與戰寵鷹架提示',
      '答錯長按星星觸發回收機制'
    ],
    steps: [
      {
        tab: '開啟單人冒險',
        page: 'P.41-44',
        title: '點選紅色「單人」，挑選臺灣/世界主題任務',
        bullets: [
          '於大廳點選紅色「單人」按鈕進入單人冒險模式。',
          '任務主題分為「臺灣」與「世界」兩大領域，選定後點選【開始遊戲】。',
          '系統會提供兩個隨機任務，玩家擇一挑戰並按【出擊】進入備戰畫面。'
        ],
        tip: '兩個隨機任務可以比較一下感興趣的主題再出擊！',
        images: [
          { src: 'image/manual/image58.webp', caption: '單人冒險四大步驟總覽' },
          { src: 'image/manual/image59.webp', caption: '選擇臺灣或世界主題開始遊戲' },
          { src: 'image/manual/image60.webp', caption: '兩個隨機任務擇一按【出擊】' }
        ]
      },
      {
        tab: '戰前準備與選角',
        page: 'P.45-47',
        title: '觀察 12 張知識卡，精選對應導師與戰寵',
        bullets: [
          '大部分題目以 4 張為一組（同一類別），共有 12 張知識卡，其中「3 張」為正確答案。',
          '先觀察知識卡推測題目所屬科目，再挑選「對應學科的導師」，可提高答對機率或增加積分！',
          '戰寵功能各有特色，新手強烈建議選擇具有「關鍵字提示」的戰寵，幫你一眼抓住題目重點！'
        ],
        tip: '選對導師 + 關鍵字提示戰寵，是新手快速通關的黃金組合！',
        images: [
          { src: 'image/manual/image61.webp', caption: '觀察知識卡推測科目' },
          { src: 'image/manual/image63.webp', caption: '選擇與任務對應的時空導師' },
          { src: 'image/manual/image64.webp', caption: '挑選具備鷹架提示功能的戰寵' }
        ]
      },
      {
        tab: '閱讀題目與發動技能',
        page: 'P.48-50',
        title: '滾動檢視題目、觸發導師與戰寵鷹架技能',
        bullets: [
          '題目一開始會自動播放一遍，出現作答介面後可上下滾動反覆細讀題目。',
          '若科目導師選擇正確，即可直接發動「導師技能」獲得強大輔助。',
          '無論在題目剛開始，或是答錯之後，皆可發動「戰寵技能」開啟鷹架提示！'
        ],
        tip: '卡關時別猶豫，記得點選戰寵頭像開啟鷹架提示喔！',
        images: [
          { src: 'image/manual/image65.webp', caption: '題目介面可上下滾動閱讀' },
          { src: 'image/manual/image67.webp', caption: '發動對應學科導師技能' },
          { src: 'image/manual/image69.webp', caption: '發動戰寵技能開啟鷹架提示' }
        ]
      },
      {
        tab: '拖曳知識卡出擊',
        page: 'P.51-52',
        title: '拖曳答案卡至對應槽位，按【出擊】攻擊魔王',
        bullets: [
          '點擊左右箭頭切換瀏覽全部 12 張答案卡。',
          '將認為正確的答案卡「拖曳」到對應位置，放滿即可按【出擊】（若倒數時間結束系統也會強制出擊）。',
          '答題正確就會發動華麗攻擊，大幅削減魔王血量！'
        ],
        tip: '留意畫面上的倒數計時器，別讓時間跑完還沒放好卡片！',
        images: [
          { src: 'image/manual/image72.webp', caption: '拖曳知識卡至槽位並出擊' },
          { src: 'image/manual/image73.webp', caption: '答題正確發動攻擊擊退魔王' }
        ]
      },
      {
        tab: '星星回收與題目詳解',
        page: 'P.53-55',
        title: '答錯觸發星星長按回收、10 秒詳解與結算',
        bullets: [
          '答題錯誤時有機會觸發「回收機制」：連續長按畫面上閃耀的星星，即可額外獲得積分、能量與 AI 晶片！',
          '不論答對或答畢皆會顯示「題目詳解」，需等待 10 秒閱讀時間跑完才可接續下一題，確保真正學到知識。',
          '通關成功後會顯示完整的答題數據與獎勵結算。'
        ],
        tip: '下方內建「單人冒險實戰模擬器」，快來親手拖曳知識卡打魔王與試玩星星回收！',
        images: [
          { src: 'image/manual/image74.webp', caption: '答錯時長按星星觸發回收獎勵' },
          { src: 'image/manual/image75.webp', caption: '題目詳解 10 秒精讀畫面' },
          { src: 'image/manual/image76.webp', caption: '通關成功答題結算資訊' }
        ]
      }
    ]
  },
  {
    id: 'ch-coop',
    num: '07',
    title: '組隊冒險',
    subtitle: '1~4人協作共解一題，或 2V2/3V3/4V4 熱血陣營對戰',
    icon: 'fa-solid fa-people-group',
    color: '#ff7b00',
    accent: 'linear-gradient(135deg, #ff7b00, #ffd166)',
    badgeName: '黃金團隊隊長',
    simulator: 'coop',
    highlights: [
      '點選橘色「多人」進入',
      '協作模式 1~4 人共闖一關',
      '陣營對戰 2V2 / 3V3 / 4V4',
      '複製房間碼一鍵邀請好友'
    ],
    steps: [
      {
        tab: '組隊模式介紹',
        page: 'P.56-58',
        title: '協作模式 vs 陣營對戰模式',
        bullets: [
          '於大廳點選橘色「多人」進入組隊冒險。',
          '協作模式（1~4 人）：與同學齊心協力共同挑戰同一道題目。',
          '陣營模式（2V2、3V3、4V4）：分隊展開刺激的知識積分對決！'
        ],
        tip: '班級分組競賽用「陣營對戰」氣氛超級嗨！',
        images: [
          { src: 'image/manual/image77.webp', caption: '組隊冒險功能總覽' },
          { src: 'image/manual/image78.webp', caption: '自行創建或加入房間' },
          { src: 'image/manual/image79.webp', caption: '選擇協作或陣營對戰模式' }
        ]
      },
      {
        tab: '抽題規則與邀請',
        page: 'P.59-60',
        title: '關卡指定規則 & 接受他人協作邀請',
        bullets: [
          '協作模式：支援輸入「指定關卡碼」或「隨機抽題」。',
          '陣營模式：為了公平競技，僅限「隨機抽題」進行對戰。',
          '玩家也可以直接接受同學發送的「協作邀請」快速加入隊伍！'
        ],
        tip: '老師想讓小組合作解同一道素養題，請開「協作模式」並輸入關卡碼！',
        images: [
          { src: 'image/manual/image80.webp', caption: '協作模式可指定關卡碼或隨機抽題' },
          { src: 'image/manual/image82.webp', caption: '接受他人的協作邀請視窗' }
        ]
      },
      {
        tab: '房間碼與全體出擊',
        page: 'P.61',
        title: '複製房間碼邀請隊友，全員就緒即可【出擊】',
        bullets: [
          '開房後點選【複製房間碼】，傳給同學輸入即可迅速集合。',
          '協作隊伍最多支援 4 名玩家，待所有隊員按下準備完成後，由房主點選【出擊】開始冒險！'
        ],
        tip: '快在下方「組隊房間配對模擬器」體驗一鍵產生並複製房間碼吧！',
        images: [
          { src: 'image/manual/image83.webp', caption: '複製房間碼邀請同學加入' },
          { src: 'image/manual/image84.webp', caption: '全員準備完成按下【出擊】' }
        ]
      }
    ]
  },
  {
    id: 'ch-blackhole',
    num: '08',
    title: '黑洞任務',
    subtitle: '主線故事、戰寵支線、議題式遊臺灣情境與黑洞背包',
    icon: 'fa-solid fa-hurricane',
    color: '#3b82f6',
    accent: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    badgeName: '黑洞穿越旅人',
    highlights: [
      '點選藍色「黑洞」進入',
      '四大任務：主線/支線/特殊/每日',
      '遊臺灣 3 章議題式情境劇情',
      '消耗油料挑戰並蒐集背包道具'
    ],
    steps: [
      {
        tab: '黑洞四大任務線',
        page: 'P.62-64',
        title: '點選藍色「黑洞」，探索四大劇情任務',
        bullets: [
          '主線任務：體驗時空學園完整世界觀與故事背景章節。',
          '支線任務：深入了解各隻可愛戰寵背後的專屬故事。',
          '特殊任務：議題式學習主題情境任務，通關後仍可重複挑戰。',
          '每日任務：每天推出不同挑戰，輪替完成後會循環更新。'
        ],
        tip: '喜歡看劇情動畫與故事對話的同學，絕對不能錯過黑洞任務！',
        images: [
          { src: 'image/manual/image85.webp', caption: '黑洞任務總覽介面' }
        ]
      },
      {
        tab: '黑洞情境任務',
        page: 'P.65-67',
        title: '新功能開發｜遊臺灣議題式學習 3 大章節',
        bullets: [
          '特殊任務包含「議題式學習主題情境故事章節 × 3 章」，以環遊臺灣的沉浸式劇情展開答題。',
          '出發提醒：必須擁有「足夠油料」才能發動引擎進行黑洞挑戰！',
          '依序閱讀豐富的情境劇情對話，再自然銜接冒險答題關卡。'
        ],
        tip: '油料不夠怎麼辦？請直接前往下一章【09 油料系統】補充油料！',
        images: [
          { src: 'image/manual/image86.webp', caption: '黑洞特殊情境任務選擇' },
          { src: 'image/manual/image87.webp', caption: '確認擁有足夠油料即可挑戰' },
          { src: 'image/manual/image88.webp', caption: '黑洞情境任務劇情畫面 A' },
          { src: 'image/manual/image89.webp', caption: '黑洞情境任務劇情畫面 B' }
        ]
      },
      {
        tab: '黑洞任務背包',
        page: 'P.68',
        title: '收集挑戰道具與未來獎勵兌換預告',
        bullets: [
          '成功挑戰黑洞任務可取得專屬特色道具，統一存放於「黑洞任務背包」。',
          '未來開發功能預告：收集到的背包道具未來將開放兌換限定獎勵！'
        ],
        tip: '現在就先把黑洞道具存起來，等待未來兌換系統上線吧！',
        images: [
          { src: 'image/manual/image90.webp', caption: '黑洞任務背包道具介面' }
        ]
      }
    ]
  },
  {
    id: 'ch-fuel',
    num: '09',
    title: '油料系統',
    subtitle: '介接因材網題庫，拖曳油槍答對全題補滿油料',
    icon: 'fa-solid fa-gas-pump',
    color: '#ffd166',
    accent: 'linear-gradient(135deg, #ffd166, #ff7b00)',
    badgeName: '滿油動力工程師',
    simulator: 'fuel',
    highlights: [
      '介接教育部因材網題庫',
      '拖曳油槍至加油孔答題',
      '答錯需重新填答至全對',
      '全數答對立即補滿油料'
    ],
    steps: [
      {
        tab: '啟動油料補充',
        page: 'P.69-70',
        title: '點選【補充】並按【開始】進入加油站',
        bullets: [
          '當黑洞冒險油料不足時，點選介面上的「補充」按鈕並按「開始」。',
          '油料補充任務直接介接「教育部因材網題庫」，邊複習課業邊賺取滿滿油料！'
        ],
        tip: '油料任務讓學習與遊戲無縫接軌，越會答題油箱越滿！',
        images: [
          { src: 'image/manual/image91.webp', caption: '油料補充任務四步驟總覽' },
          { src: 'image/manual/image92.webp', caption: '點選補充並按開始' }
        ]
      },
      {
        tab: '拖曳油槍作答',
        page: 'P.71-72',
        title: '依序拖移油槍至加油孔，答錯需重填',
        bullets: [
          '閱讀嫁接自因材網的學科題目，依序將正確選項對應的「油槍」拖曳到加油孔完成答題。',
          '精熟學習機制：若有答錯的題目需要重新填答，直到全部題目皆正確為止。'
        ],
        tip: '看仔細題目再拖曳油槍，就能一次加滿不重來！',
        images: [
          { src: 'image/manual/image93.webp', caption: '拖曳油槍到對應加油孔答題' },
          { src: 'image/manual/image94.webp', caption: '錯誤題目重新填答提示' }
        ]
      },
      {
        tab: '補滿油料再出發',
        page: 'P.73',
        title: '全數答對成功補充油料，繼續黑洞闖關',
        bullets: [
          '當所有題目全數答對後，系統立即為你補充油料！',
          '取得足夠油料後，就能馬上返回「黑洞任務」繼續未完的星際旅程。'
        ],
        tip: '快到下方「油料補充加油站小遊戲」親自體驗拖曳/點擊油槍補滿油箱！',
        images: [
          { src: 'image/manual/image95.webp', caption: '全數答對完成油料補充' }
        ]
      }
    ]
  }
];

/* 綜合隨堂闖關測驗題庫 */
window.QUIZ_DATA = [
  {
    q: '在「大廳設定」中，關於「導師等級」的調整權限，下列何者正確？',
    options: [
      '只有教師帳號可以手動調整，學生帳號會依據學校年級綁定',
      '只有學生帳號可以調整，教師帳號無法調整',
      '所有人都無法調整導師等級',
      '需要花費油料才能調整導師等級'
    ],
    answer: 0,
    explain: '導師等級會影響抽到的題目難度，僅「教師帳號」可手動調整，學生帳號依學校資料自動綁定（手冊 P.9）。'
  },
  {
    q: '想在首頁直接依據「年級」與「主要學科」篩選關卡，應該怎麼操作？',
    options: [
      '輸入「9999」再按搜尋',
      '在搜尋欄空白狀態下直接按下「搜尋」，即可指定年級與主要學科',
      '必須先完成 10 次黑洞任務才會解鎖',
      '只能在信件頁面中篩選'
    ],
    answer: 1,
    explain: '在首頁搜尋區直接按搜尋，即可開啟年級與主要學科篩選面板（手冊 P.18）。'
  },
  {
    q: '單人冒險答題時，大部分題目會提供 12 張知識卡（4 張一組），其中有幾張是正確答案？',
    options: [
      '1 張',
      '2 張',
      '3 張',
      '6 張'
    ],
    answer: 2,
    explain: '大部分題目以 4 張為一組（同一類別），共有 12 張知識卡，其中 3 張為正確答案（手冊 P.45）。'
  },
  {
    q: '單人冒險如果不小心答題錯誤，有機會觸發哪一項超棒的「回收機制」？',
    options: [
      '連續長按星星，獲得積分、能量與 AI 晶片',
      '重新啟動瀏覽器獲得雙倍分數',
      '直接跳過魔王算作通關',
      '自動解鎖全部動態魔王'
    ],
    answer: 0,
    explain: '答題錯誤時有機會觸發回收機制，連續長按星星就能獲得積分、能量與 AI 晶片（手冊 P.53）。'
  },
  {
    q: '關於「組隊冒險」的規則，下列敘述何者正確？',
    options: [
      '協作模式最多 2 人，且不能指定關卡碼',
      '陣營對戰支援 2V2、3V3、4V4，且僅能隨機抽題對戰',
      '組隊冒險不需要等待隊友準備完成就能直接出擊',
      '陣營對戰可以自由輸入關卡碼作弊'
    ],
    answer: 1,
    explain: '協作模式為 1~4 人（可指定關卡碼或隨機抽題）；陣營模式為 2V2/3V3/4V4，僅限隨機抽題對戰（手冊 P.58-59）。'
  },
  {
    q: '進行「黑洞任務」若油料不足，應該透過什麼方式補充油料？',
    options: [
      '在排行榜按讚 10 次',
      '開啟油料補充任務，完成介接自因材網的拖曳油槍答題（需全對）',
      '更換 AI 導師的服裝',
      '掃描隨機 QR Code'
    ],
    answer: 1,
    explain: '油料補充任務嫁接因材網題庫，依序拖曳油槍到加油孔答題，答錯需重填直至全數正確即可補充油料（手冊 P.69-73）。'
  }
];

/* 吉祥物互動導覽語錄 */
window.MASCOT_QUOTES = [
  '嗨！我是快樂鯉魚秋老虎，拖曳我到畫面任何地方陪你逛手冊吧！',
  '小秘訣：單人冒險選「關鍵字提示」戰寵，破關速度快兩倍喔！',
  '別忘了點進第 04 章欣賞 2026 全新會動的「動態魔王」喔！',
  '答錯別氣餒！長按星星就能觸發回收機制賺 AI 晶片！',
  '黑洞任務油料不夠了嗎？快去第 09 章拖曳油槍補滿油箱！',
  '點一下頁尾的 FB 粉絲專頁「快樂鯉魚秋老虎」幫我們按個讚吧！'
];
