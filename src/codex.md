# 지식 코덱스

컨텍스트가 길어지고 넘쳐 흐를수록 모델은 사실을 잊고, 타임라인을 뒤섞고, 캐릭터에서 벗어나요. 연구자들은 장기 롤플레이에서 이런 실패 유형을 측정했어요. 사실 손실, 타임라인 혼동, 페르소나 이탈이에요([ARPM, 2026](https://arxiv.org/pdf/2605.14802), [PCL](https://arxiv.org/html/2503.17662v1), [CloneMem](https://arxiv.org/pdf/2601.07023)).

LumiBooks는 이미 압축으로 이 문제에 어느 정도 맞서고 있어요. 메모리아가 채팅을 챕터로 정리하고, 챕터를 아크로 묶고, 아크를 볼륨으로 합쳐요.

요컨대 이 요약들은 *무슨 일이 있었는지*를 시간순으로 알려 줘요. 요약에만 기대면 개체 간 관계나 세부 사항처럼 계층적이고 가치 높은 정보를 요약이 빠짐없이 담아 주기만 바라야 한다는 게 가장 큰 문제예요. 압축을 거듭할수록 이건 점점 어려워지니, 명시적인 추적이 필요해요.

지식 코덱스가 바로 이 문제를 해결해요.

## 코덱스란

코덱스는 채팅을 위한 스토리 바이블이에요. 이야기가 자라는 동안 에이전트가 새 턴을 빠짐없이 읽고, 몇 가지 기록을 갱신해요.

- **캐릭터, 장소, 사물.** 개체 시트는 계층적 시나리오 작성부터 구조화된 스토리 생성까지, 대부분의 스토리 시스템의 뼈대예요([Dramatron](https://arxiv.org/pdf/2209.14958), [Narrative Planning](https://arxiv.org/pdf/1401.3841), [Decomposed Screenwriting](https://arxiv.org/html/2510.23163v1)).
- **관계.** 개체 사이의 관계와 그 흐름을 적는 공유 표예요. 내러티브 지식 그래프 연구에 따르면 관계는 고정된 스냅숏이 아니라 변해 가는 모습대로 추적해야 해요([Iyyer et al., NAACL 2016](https://aclanthology.org/N16-1180/), [Narrative Graph](https://www.researchgate.net/publication/370272383_Narrative_Graph_Telling_Evolving_Stories_Based_on_Event-centric_Temporal_Knowledge_Graph), [Relation Clustering](https://www.researchgate.net/publication/346475960_Relation_Clustering_in_Narrative_Knowledge_Graphs)). 일부 모델은 이 표를 관리하기 버거워해서 선택 사항이에요.
- **타임라인.** 주요 사건을 날짜와 함께 남기는 기록이에요. 타임라인 혼동은 가장 흔한 실패 유형 중 하나이고, 꾸준히 관리하는 타임라인은 고전적인 방어책이에요([ARPM](https://arxiv.org/pdf/2605.14802), [narrative dimensions](https://arxiv.org/pdf/2604.10786), [event relation extraction](https://arxiv.org/pdf/2106.08629)).
- **스레드.** 진행 중이거나 멈춘 줄거리, 그리고 나중에 회수하려고 심어 둔 복선이에요. 스레드와 개요 상태를 명시적으로 관리해야 수천 단어가 넘어가도 플롯이 일관성을 유지해요([DOC](https://arxiv.org/pdf/2212.10077), [Writing Path](https://arxiv.org/html/2404.13919v1), [plot structure management](https://www.sciencedirect.com/science/article/pii/S1875952123000459)).
- **세계.** 배경 세계의 규칙이에요(마법 체계, 세력, 지리, 설정, 세계 자체에 관한 사실). 이야기의 깊이에 중요해요([KG-guided storytelling](https://arxiv.org/html/2505.24803v2), [KG + literary theory](https://arxiv.org/pdf/2508.03137), [hierarchical story KGs](https://arxiv.org/html/2506.10008v1)).
- **지식과 비밀.** 누가 무엇을 아는지예요. 각 캐릭터가 실제로 목격한 것으로 기억을 제한하면 모델이 크게 나아지는데, 믿음 추적은 LLM이 정말 형편없는 분야예요([perspective-bounded memory](https://arxiv.org/pdf/2606.25632), [MREval](https://aclanthology.org/2026.findings-acl.1175/), [ToMATO, AAAI 2025](https://ojs.aaai.org/index.php/AAAI/article/view/32143), [EnigmaToM](https://arxiv.org/pdf/2503.03340)).

## 왜 이 기록들인가요?

모두 검증된 실패 유형이거나, 긴 글의 일관성을 높인다고 밝혀진 장치예요. 스토리 바이블은 쓸모 있고 간결해야 하면서도, 압축 과정에서 사라지기 쉬운 고밀도 정보를 지켜야 해요([Generative Agents](https://arxiv.org/abs/2304.03442), [MemGPT](https://arxiv.org/abs/2310.08560), [MemoryBank, AAAI 2024](https://arxiv.org/abs/2305.10250)).

다른 트래커가 기록하는 것 중 일부는 일부러 뺐어요.

- **호감도·신뢰도 수치.** 관계는 점수보다 흐름으로 다루는 편이 낫다는 연구가 있어요([Narrative Graph](https://www.researchgate.net/publication/370272383_Narrative_Graph_Telling_Evolving_Stories_Based_on_Event-centric_Temporal_Knowledge_Graph)). 호감도 62 같은 숫자는 LLM이 제멋대로 해석할 수 있는 가짜 정밀도예요. "그녀를 사랑하지만 숨김, 12일째에 배신당함"이 훨씬 많은 정보를 담아요. 이런 건 관계로 추적해요.
- **턴마다의 장면 상태.** 누가 어디에 서 있는지, 지금 날씨, 순간적인 기분 같은 것들이에요. 채팅 끝의 미압축 구간이 이미 현재 장면을 보여 주니 두 번 추적할 필요가 없고, 추적하려면 매 턴 갱신해야 해요.
- **소지품 장부, 성격 변화 로그, 세력 관계 행렬.** 표가 하나 늘 때마다 에이전트의 관리 부담이 몇 배로 커지고, 오래된 데이터가 쌓이고 추적할 관계가 생기는 자리가 하나 더 늘어요. 중요한 물건은 이미 사물로 기록되고, 오래가는 캐릭터 변화는 시트 자체에, 결정적인 전환은 타임라인의 사건으로 들어가요.
- **대사 원문.** 나중에는 대사도 추적할 수 있을지 몰라요. 아직은 모르겠어요.

## 작동 방식

직접 정한 일정에 따라 주기적으로, LB가 이야기의 한 조각을 현재 기록과 약간의 과거 맥락과 함께 가벼운 에이전트에게 넘겨요. 그러면 에이전트가 세 가지 일을 해요.

1. **갱신.** 이야기가 진행되며 낡은 섹션을 모두 다시 써요.
2. **점검.** 오래된 내용이 남아 있지 않은지 확인해요.
3. **압축.** 군더더기와 서술형 문장, 중복 정보, 장황한 표현을 걷어내요.

새롭고 아름다운 글래스 UI에서 기록을 직접 편집할 수도 있어요.

## 프롬프트에 들어가는 방식

코덱스는 늘 켜져 있는 한 덩어리 블록으로 주입되지 않아요. 각 기록은 `LumiBooks Codex [Do Not Edit] - <chat>`이라는 채팅별 전용 월드북에 미러링되고, 무엇이 프롬프트에 들어갈지는 호스트의 기본 월드북 활성화 기능이 정해요.

- **개체, 세계 주제, 비밀**은 조정 → 설정 → 코덱스의 세 가지 **코덱스 상기** 설정을 따라요. **항상**, **키워드**(기본값), **벡터 + 키워드** 중에서 고를 수 있어요. 에이전트는 기록마다 `keywords` 목록을 함께 적어요(이름, 별칭, 참여자는 자동으로 일치해요). 벡터 모드에서는 Lumiverse의 월드북 검색으로 의미가 가까운 기록도 찾아와요.
- **타임라인과 스레드**는 키워드 일치가 별 의미가 없어서 상시 항목이에요.

벡터 상기를 쓰려면 Lumiverse에서 테스트를 마친 임베딩 연결과 월드북 벡터화가 켜져 있어야 해요. 모드를 바꾸면 기존 기록이 색인 대기열에 들어가고, 새로 만들거나 편집한 기록도 같은 설정을 따라요. 색인이 끝나기 전이나, 검색을 쓸 수 없거나, 검색에 쓸 최근 텍스트가 보이지 않을 때도 키워드 일치는 그대로 작동해요. 꺼 둔 기록과 파일은 계속 제외돼요. 검색 한도와 임베딩 프로바이더는 Lumiverse가 관리하고, 정본은 여전히 코덱스 파일이에요.

챕터와 그 위 단계의 요약에는 조정 → 설정 → 책 → 전체 공통에 별도의 **요약 상기** 설정이 있어요. 기본값은 **항상**이에요. 어떤 기억을 고르든 정리되거나 숨겨지는 메시지는 바뀌지 않아요. 같은 섹션에서, Lumiverse에서 관리되는 두 월드북 중 어느 쪽이든 이름을 직접 바꾸기 전에 **월드북 이름을 채팅 이름에 맞추기**를 꺼 두세요.

미러 월드북은 LumiBooks가 자주 다시 쓰니 직접 편집하지 마세요. 기록은 코덱스 탭(또는 JSON 파일)에서 편집하세요.

## 확장 프로그램 개발자용

LumiBooks는 코덱스를 Spindle의 공유 RPC 풀에 게시해요. 어느 확장 프로그램 백엔드에서든 읽을 수 있어요.

```ts
// Full snapshot: all 8 files as parsed JSON, plus per-file states.
const snap = await spindle.rpcPool.read(`lumi_books.codex.${chatId}`);
// snap: { chatId, userId, files: { characters, locations, things, relations,
//         timeline, threads, world, knowledge }, fileStates, runs, updatedAt }

// The whole Codex rendered as one text block. Note LumiBooks itself no longer
// injects this block: records reach the prompt as lorebook entries (see
// "How it reaches the prompt"), so this is a convenience view for consumers.
const text = await spindle.rpcPool.read(`lumi_books.codex.${chatId}.rendered`);

// Change signal: the most recent Codex mutation across all chats.
const evt = await spindle.rpcPool.read("lumi_books.codex_updated");
// evt: { chatId, userId, changedFiles, reason: "run"|"tidy"|"edit"|"states"|"wipe", updatedAt }
```

참고:

- 엔드포인트는 세션에서 코덱스가 처음 활동한 뒤에 생겨요. 그 전에는 `read`가 거부되니 try/catch로 감싸세요.
- 코덱스를 비우면 두 채팅 엔드포인트 모두에 `null`이 게시돼요.
- `fileStates`는 사용자가 끈(`noInject`) 파일과 동결한(`frozen`) 파일을 표시해요. `rendered` 텍스트에는 이미 빠져 있어요. `files`를 직접 쓴다면 이 플래그를 지켜 주세요.
- `lumi_books.latest_chapter`, `lumi_books.latest_arc`, `lumi_books.latest_volume`은 요약 이벤트를 전달하며, 이전부터 게시되어 왔어요.
