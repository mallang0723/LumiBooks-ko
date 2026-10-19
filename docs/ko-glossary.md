# 한국어 용어집 (LumiBooks 한국어판)

`src/locales/ko.json`을 번역하거나 고칠 때 이 표를 따릅니다. 호스트(Lumiverse) 한국어 UI에 이미 있는 용어는 호스트 표기를 그대로 씁니다.

## 문체

- **라벨·탭·필드 이름**: 명사형 (`챕터 정리`, `요약 설정`, `저장`).
- **메시지·설명·튜토리얼**: 해요체 (`챕터를 만들었어요`, `연결을 선택하세요`).
- **확인 질문**: `~할까요?` (`책장을 비울까요?`).
- **오류**: `~하지 못했어요: {error}` 처럼 짧게. 영어 원문의 `Couldn't …` 꼴.
- **메모리아(Memoria)**: 귀여운 고양이 사서. 1인칭은 `저`, 해요체를 기본으로 하되 장난스러운 말투와 감탄(`냐아~`, `냥!`, `흐흥`)을 살립니다. 영어의 대문자 외침·이모지·`>:(` 같은 표정은 그대로 둡니다.

## 핵심 용어

| 영어 | 한국어 | 비고 |
|---|---|---|
| LumiBooks | LumiBooks | 제품명, 번역하지 않음 |
| Memoria | 메모리아 | |
| chapter | 챕터 | |
| arc | 아크 | |
| volume / series / saga / library / universe | 볼륨 / 시리즈 / 사가 / 라이브러리 / 유니버스 | 상위 요약 단계 이름 |
| tier | 단계 | |
| summary | 요약 | |
| compact, compress | 압축 | uncompressed = 미압축 |
| file (a chapter) | 정리 | `File chapter` = 챕터 정리, `File all` = 모두 정리, `Filed` = 정리됨 |
| bind (an arc) | 묶기 | `Bind arc` = 아크 묶기 |
| press (a volume) | 합치기 | |
| shelf, bookshelf | 책장 | |
| world book, lorebook | 월드북 | 호스트는 `World Book`을 월드북, 캐릭터 내장 `lorebook`을 로어북으로 씁니다. LumiBooks의 책은 호스트의 월드북 패널에 보이므로 둘 다 월드북으로 통일 |
| world info | 월드 인포 | 호스트 표기 |
| entry | 항목 | 호스트 표기 |
| inject, injection | 주입 | |
| lag | 지연 | 압축하지 않고 남겨 두는 최근 메시지 수 |
| window | 윈도우 | 한 챕터로 묶을 메시지 묶음 크기 |
| ghost (chapter) | 유령 (챕터) | |
| root, rooted | 루트 | 월드북 항목 이름의 `[Root]` 접두사는 코드가 비교하므로 **원문 그대로** |
| release | 해제 | 요약을 일반 월드북 항목으로 떼어 냄. `[orphaned]` 접두사는 원문 그대로 |
| regenerate | 재생성 | 호스트 표기 |
| rebuild | 재구축 | |
| wipe | 비우기 | |
| purge | 영구 삭제 | |
| detach | 분리 | |
| resync | 재동기화 | |
| continuity | 연속성 | |
| rebase | 리베이스 | 다른 채팅의 챕터·아크를 프롤로그로 가져옴 |
| fork | 분기 | 호스트 표기 |
| Codex | 코덱스 | |
| entity | 개체 | |
| relation, relations table | 관계, 관계 표 | |
| lore | 설정 | |
| secret | 비밀 | |
| timeline | 타임라인 | |
| thread (plot) | 스레드 | |
| seeds, planted | 복선, 심어 둔 복선 | |
| knowledge | 지식 | |
| character / location / thing | 캐릭터 / 장소 / 사물 | |
| tidy | 정돈 | |
| catch up | 따라잡기 | |
| backlog | 밀린 작업 | |
| stale | 오래됨 | |
| frozen | 동결 | |
| lock, locked | 잠금, 잠김 | |
| recall | 상기 | |
| placement | 배치 | |
| depth | 심도 | 호스트 표기 |
| dry run | 모의 실행 | 호스트 표기 |
| diagnostics | 진단 | 호스트 표기 |
| import / export | 가져오기 / 내보내기 | |
| undo | 실행 취소 | |
| reset | 재설정 | |
| prompt | 프롬프트 | |
| preset | 프리셋 | |
| profile | 프로필 | |
| connection | 연결 | 호스트 표기 |
| model | 모델 | |
| token | 토큰 | |
| context | 컨텍스트 | |
| sampler | 샘플러 | |
| temperature | 온도 | |
| regex | 정규식 | |
| macro | 매크로 | |
| tool call | 도구 호출 | |
| automation | 자동화 | |
| toast | 알림 | |
| message / turn | 메시지 / 턴 | |
| persona | 페르소나 | |
| user / assistant / system (역할) | 사용자 / 어시스턴트 / 시스템 | |
| lesson / course / exam | 수업 / 과정 / 시험 | |
| diploma / seal | 졸업장 / 인장 | |
| Memoria's Academy | 메모리아 아카데미 | |
| gilded / silver / bronze / apprentice | 금장 / 은장 / 동장 / 견습 | 수업 성적 |

### 번역하며 정한 추가 용어

| 영어 | 한국어 | 비고 |
|---|---|---|
| provider | 프로바이더 | 호스트 표기 |
| penalty (frequency / presence) | 패널티 (빈도 / 존재) | 호스트 표기 |
| update (Codex) | 업데이트 | 버튼은 `지금 업데이트`, `코덱스 업데이트`. 문장 속 동사로는 `갱신`도 씀 |
| refresh | 갱신 | |
| record (Codex) | 기록 | |
| entity sheet | 개체 시트 | |
| ties (entity field) | 유대 | 스키마 필드 이름으로 쓸 때는 `ties` 그대로 |
| pass (Codex run) | 패스 | |
| Compose (Books 하위 탭) | 만들기 | |
| Maintenance | 관리 | |
| Advanced | 고급 | |
| Tail (recent uncompressed messages) | 최근 구간 | |
| lag ready / building, window ready / building | 지연 충족 / 대기, 윈도우 충족 / 대기 | 홈 탭 상태 배지 |
| Simulate | 시뮬레이션 | `dry run`(모의 실행)과 구별 |
| inherit, inherited memories | 물려받기, 물려받은 기억 | |
| coverage | 범위 | |
| fingerprint | 지문 | |
| carry over (Codex) | 이어받기 | |
| Thorough mode | 꼼꼼 모드 | |
| catch-up Slow / Fast / Ultra fast | 느림 / 빠름 / 초고속 | |
| recall | 상기 | `Summary recall` = 요약 상기, `Codex recall` = 코덱스 상기 |
| Everywhere (설정 구역) | 전체 공통 | |
| story bible | 스토리 바이블 | |
| Knowledge Codex | 지식 코덱스 | |
| world rules | 세계 규칙 | |
| index, unindexed | 색인, 미색인 | |
| embedding, vectorization | 임베딩, 벡터화 | |
| tokenizer | 토크나이저 | |
| nyandere | 냥데레 | |
| Lore limit / Lore tokens (프로필 예산) | 월드북 한도 / 월드북 토큰 | 활성화된 월드북 항목의 토큰 예산. 코덱스의 `lore`(설정)와 구별 |

## 탭 이름

| 영어 | 한국어 |
|---|---|
| Home | 홈 |
| Books | 책 |
| Codex | 코덱스 |
| Tuning | 조정 |
| Info | 정보 |

## 번역하면 안 되는 것

- ICU 인자 이름(`{count}`, `{path}` …)과 `select` 선택자 값(`yes`, `user`, `codex` …). 한국어 복수형은 `other` 하나면 됩니다: `{count, plural, other {메시지 #개}}`.
- 매크로 토큰: `'{{user}}'`, `'{{memoria_short_comment_rules}}'` 처럼 작은따옴표로 감싼 형태 그대로.
- ICU에서 작은따옴표는 `''`로 씁니다.
- 파일·필드·명령 이름: `relations.json`, `char:elias`, `rid`, `set`, `drop`, `seeds`, `JSON`, `STMB` 등.
- `ui.tabs.profileTab.change.*` (`{prefix}TargetUnit` 등): 코드가 설정 키로 쓰므로 영어 원문 그대로.
- 월드북 이름의 `LumiBooks` 접두사(`{worldBookNamePrefix}`)는 맨 앞에 둡니다. 코드가 이 접두사로 잃어버린 책을 찾습니다.


## 수업 예제 이야기의 고유명사

수업(lessons) 연습용 채팅과 코덱스 예제에 나오는 이름입니다. 개체 ID(`char:elias`, `loc:ashford_manor` 등)는 번역하지 않습니다.

| 영어 | 한국어 |
|---|---|
| Elias | 엘리아스 |
| Mara | 마라 |
| Wren | 렌 |
| Ashford (duke) | 애시퍼드 (공작) |
| Ashford Manor | 애시퍼드 저택 |
| the Ashford Case | 애시퍼드 사건 |
| Wren Street | 렌 거리 |
| City Watch, the watch | 도시 경비대, 경비대 |
| Captain | 경비대장 |
| Magistrate | 치안판사 |
| duke | 공작 |
| pawnbroker | 전당포 주인 |
| ferryman | 뱃사공 |
| locket | 로켓 목걸이 |
