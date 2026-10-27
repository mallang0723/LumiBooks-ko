# LumiBooks 한국어판 (포크) 안내

이 저장소는 [AMousePad/LumiBooks](https://github.com/AMousePad/LumiBooks)의 화면 문구를 한국어로 옮긴 포크입니다. 기능 코드는 원작과 같고, 한국어 카탈로그와 그것을 켜는 최소한의 변경만 더했습니다. 원작 병합을 쉽게 하려고 포크 전용 변경은 아래 파일에만 둡니다.

## 원작과 다른 파일

| 파일 | 변경 |
|---|---|
| `src/locales/ko.json` | **신규.** 한국어 카탈로그. `en.json`과 같은 키 구조 |
| `src/i18n/index.ts` | `ko.json`을 번들에 넣고(`BUNDLED_CATALOGS`), 빌드 시 정의되는 `LUMIBOOKS_LOCALE`로 `t`의 언어를 고름(`APP_LOCALE`) |
| `src/i18n/ko.test.ts` | **신규.** 한국어 카탈로그 검사(키 누락·인자·코드가 비교하는 문자열·수업 예시 오류 문구) |
| `package.json` | `build:backend`, `build:frontend`, `export:guide`에 `--define 'LUMIBOOKS_LOCALE="ko"'` 추가 |
| `spindle.json` | `identifier`, `version`, `name`, `author`, `github`, `homepage`, `description` |
| `.github/README.md` | 맨 위 한국어 안내 섹션 |
| `docs/ko-fork.md`, `docs/ko-glossary.md` | **신규.** 이 문서와 용어집 |
| `src/codex.md`, `dist/backend.js`, `dist/frontend.js` | 빌드 산출물. 한국어로 다시 생성됨 (직접 고치지 않음) |

## 한국어가 켜지는 방식

- `src/i18n/index.ts`의 `t`는 `createTranslator(APP_LOCALE, BUNDLED_CATALOGS)`입니다. `APP_LOCALE`은 번들러가 `LUMIBOOKS_LOCALE`을 문자열로 치환했을 때만 그 값이 되고, 아니면 `en`입니다.
- `bun run build`의 `build:backend`/`build:frontend`가 `--define 'LUMIBOOKS_LOCALE="ko"'`로 번들을 만들기 때문에, 모듈을 불러올 때 만들어지는 라벨·탭 메타데이터·수업 내용·단계 이름(`TIER_NAMES`)·내장 프리셋 이름까지 모두 한국어로 나옵니다. 실시간 언어 전환은 없습니다(원작 설계 그대로).
- `export:guide`도 같은 정의로 실행되어 `src/codex.md`(코덱스 안내서)를 한국어로 만듭니다.
- 정의 없이 소스를 직접 실행하는 경우(`bun test src`, `check:lessons`, `typecheck`)는 영어입니다. 원작 테스트가 영어 문구를 검사하므로 그대로 통과시키기 위한 선택입니다. 한국어 쪽은 `src/i18n/ko.test.ts`가 따로 검사합니다.
- `ko.json`에 없는 키는 영어로 대체됩니다(`createTranslator`의 원래 동작).
- 영어판을 빌드하려면 `package.json`의 `--define` 값을 `"en"`으로 바꾸거나 빼면 됩니다.

## 확장 ID와 버전

- **ID: `lumi_books_ko`.** Lumiverse는 같은 `identifier`의 확장을 두 번 설치하지 못합니다(`Extension "…" is already installed`). 원작과 함께 설치할 수 있도록 ID를 바꿨습니다.
- **대가:** 확장별 저장소(`spindle.userStorage`)가 원작과 분리됩니다. 설정·프로필(`settings.json`), 수업 진행도, 코덱스 기록·백업, 진단 기록은 원작에서 넘어오지 않습니다. 코덱스는 원작에서 내보내 한국어판에서 가져오면 됩니다.
- **공유되는 것:** 챕터·아크 요약은 호스트의 월드북과 채팅 메타데이터에 있고, 그 표식(`LumiBooks` 이름 접두사, 항목의 `lumibooks` 확장 키, `lumibooks_chat_id`·`lumibooks_book_id` 메타데이터)은 원작과 같습니다. 그래서 요약은 그대로 이어지지만, **원작과 한국어판을 같은 계정에서 동시에 켜면 두 확장이 같은 월드북을 함께 관리하게 됩니다.** 하나만 켜세요.
- `src/shared.ts`의 `EXTENSION_ID = "lumi_books"`는 바꾸지 않았습니다. 다른 확장이 구독하는 공개 엔드포인트(`lumi_books.codex.<chatId>`, `lumi_books.codex_updated` 등)의 이름이라, 한국어판도 같은 이름으로 내보냅니다.
- `scripts/test-real-host.ts`, `scripts/vector-host-scenarios.ts`(실제 호스트 대상 개발용 스크립트)는 `"lumi_books"`를 직접 씁니다. 한국어판으로 돌리려면 그 ID를 `lumi_books_ko`로 바꿔야 합니다. 기본 검사(`bun test src`, `build`)와는 무관합니다.
- **버전: `1.1.4+ko`.** 원작 버전에 semver 빌드 메타데이터를 붙였습니다. Lumiverse는 버전을 비교하지 않고 문자열로만 저장·표시하며, 업데이트 확인은 git 기준입니다.

## 원작 따라가기

```sh
git fetch upstream
git merge upstream/main
```

충돌이 나기 쉬운 곳과 처리:

- `spindle.json`: 포크 값(ID·이름·작성자·주소·설명)은 유지하고, `version`은 원작 새 버전에 `+ko`를 붙입니다. 권한·`minimum_lumiverse_version` 등 나머지는 원작을 따릅니다.
- `package.json`: 원작 변경을 받고 세 스크립트의 `--define 'LUMIBOOKS_LOCALE="ko"'`만 다시 붙입니다.
- `src/i18n/index.ts`: 원작 변경을 받고 `korean` import, `BUNDLED_CATALOGS`, `APP_LOCALE`, `t` 정의만 다시 적용합니다.
- `dist/*`, `src/codex.md`: 손으로 병합하지 말고 원작 쪽을 받은 뒤(`git checkout --theirs dist src/codex.md`) 다시 빌드합니다.

병합 후 번역 상태 확인:

```sh
bun run check:locales         # ko.json에 남은 삭제된 키(unknown message), 빈 값, ICU 오류, 인자 불일치
bun test src/i18n/ko.test.ts  # 새로 생긴 미번역 키 목록(원작에 생긴 키가 ko.json에 없으면 실패)
git diff ORIG_HEAD -- src/locales/en.json   # 영어 문구가 바뀐 기존 키 (번역도 고쳐야 할 수 있음)
```

미번역 키는 영어로 표시되므로 앱은 동작하지만, 테스트가 실패하는 동안은 `ko.json`을 채워 주세요. 다 고친 뒤 `bun test src && bun run build`를 돌리고 `dist/`와 `src/codex.md`를 함께 커밋합니다.

## 로캘과 무관하게 고정해야 하는 문구

코드가 문구를 비교하거나 저장 키로 쓰는 곳입니다. `ko.test.ts`가 검사합니다.

- `backend.pipeline.comment.arc`: 월드북 항목 이름 앞의 `[Root] ` (`rebase.ts`, `summary-backup.ts`가 비교)
- `shared.codexBookNameFor.codexDoNotEdit`, `backend.summaryBackup.exportSummaryLorebook.lumiBooksSummaries`: 맨 앞 `LumiBooks` (`world-book.ts`가 접두사로 책을 찾음)
- `ui.tabs.profileTab.change.targetUnit` / `targetPercent` / `targetTokens`: `profile-tab.ts`가 설정 객체의 **키**로 씁니다. 영어 원문(`{prefix}TargetUnit` 등) 그대로 둡니다.
- `ui.lessons.contentCodex.courseCodex.charElias` / `charCaptain`: 수업이 펼칠 개체 ID(`char:elias`).
- `ui.tabs.codexTab.renderRelationGraph.group`: 관계 그래프 SVG의 CSS 클래스(` group`).
- `ui.lessons.diploma.renderDiploma.prefersReducedMotionReduce`: `matchMedia` 질의문.
- `ui.tabs.codexTab.knowledgeSpecs.*`의 `=>` 구분자: 코드가 나눠 읽습니다.
- 수업 예시 오류 문구(`ui.lessons.contentBooks.courseBooks.memoriaCouldnTFileTheChapterThe`, `ui.lessons.contentCodex.courseCodex.memoriaCouldnTUpdateTheCodexThe`)는 실제 오류 문구의 한국어와 같아야 합니다. `check:lessons`는 영어만 검사하므로 `ko.test.ts`가 대신 맞춰 봅니다.

## 모델에게도 보이는 카탈로그 문구

`backend.codex.schema.*`(코덱스 검증 오류)와 일부 `backend.codex.agent.*` 문구는 화면에도 나오지만, 코덱스 에이전트에게 `tool_result` 피드백으로도 전달됩니다(`src/backend/codex/agent.ts`). 한국어로 옮기되 경로·필드·파일·ID 표기(`{path}`, `set[{i}]`, `relations.json`, `{ns}:<lowercase_snake_case>` 등)는 원문 그대로 두었습니다. 영어 피드백이 필요하면 해당 키를 `ko.json`에서 빼면 영어로 대체됩니다.

## 한국어로 바뀌지 않는 문구 (코드에 영어로 고정)

카탈로그를 거치지 않아 한국어판에서도 영어로 보이는 곳입니다. 고치려면 원작 코드를 바꿔야 해서 이 포크에서는 손대지 않았습니다.

| 위치 | 문구 | 비고 |
|---|---|---|
| `src/backend/index.ts:1259, 1477, 1523, 1583`, `src/backend/codex/backup.ts:137`, `src/ui/tabs/codex-tab.ts:709, 711` | `update`, `wipe`, `rebuild`, `catch-up` | 코덱스 탭 「실행 취소 {…}」 버튼과 확인 문구에 그대로 들어감 |
| `src/backend/pipeline.ts:241-271` | `12s`, `1m5s`, `~1.3kt` | 홈의 작업 상태 줄 시간·토큰 단위 |
| `src/backend/codex/prompt.ts:501-664` | `[Codex] Character: …`, `[Codex] Timeline`, `[Codex] Threads` 등 | 코덱스 월드북 항목 이름. 주입 내용 머리글 `[Story Bible - …]`은 모델용 |
| `src/ui/tabs/books-tab.ts:320` | `superseded` | 책장 항목 태그 |
| `src/ui/tabs/prompts-tab.ts:450` | `{이름} copy` | 프롬프트 복제 기본 이름 |
| `src/ui/tabs/prompts-tab.ts:430` | `{category}` 자리에 `chapter`/`arc`/`volume`/`codex` | 「새 … 프롬프트 이름」 입력창 |
| `src/backend/pipeline.ts:1224`, `src/backend/world-book.ts:446` | `[Root] `, `[orphaned] ` | 코드가 비교하는 표식이라 영어 유지가 맞음 |
| `src/shared.ts:82-87, 563-585` | `1st Summary Chapter Containing 18 Prior Turns` 등 | 요약 항목 머리글. 주입 내용이라 모델 프롬프트에 해당 (수업 예제도 같은 영어 머리글 유지) |
| `src/backend/codex/agent.ts:454-872` | `set: expected an array of rows` 등 | 코덱스 에이전트 봉투 검증 오류. 모델 피드백이지만 실시간 출력·오류 알림에도 섞여 보임 |
| `src/backend/diagnostics.ts:131-132` | 개인정보 안내·메모 | 내보낸 진단 JSON 파일 안 |
| 호스트·프로바이더 오류 | `describeError(err)` 원문 | 호스트가 준 문구는 그대로 표시 |

날짜·숫자 표시(`toLocaleString`)는 브라우저 로캘을 따릅니다.

## 한국어판에서 모델에게 한국어로 가는 것

프롬프트 자체는 영어지만, 다음은 카탈로그를 거치므로 한국어판에서는 한국어로 모델에게 갑니다.

- 코덱스 검증 오류 피드백(`backend.codex.schema.*` 등, 위 절 참고)
- 코덱스 작업 구간 라벨(`src/backend/codex/index.ts`의 `chunkLabel`)
- 새로 만든 아크·볼륨 월드북 항목 이름(`아크 #4 - …`). 요약 프롬프트의 `<<ARC n: …>>` 머리글과 코덱스 입력에 들어갑니다. 이미 만든 영어 이름은 그대로입니다.

## 모델 프롬프트 위치 (번역하지 않음)

모델에게 보내는 프롬프트는 카탈로그와 따로 있으며 이 포크에서는 원문 그대로입니다. 한국어 출력용 프롬프트 프리셋을 만들 때 참고하세요. (앱의 **프롬프트** 탭에서 사용자 프리셋으로 복제·수정하는 방법이 코드 변경 없이 가장 간단합니다.)

| 위치 | 내용 |
|---|---|
| `src/prompts/books/*.txt` | 챕터(`chapter-summary`, `chapter-summarize`, `chapter-synopsis`, `chapter-minimal`), 아크(`arc-default`), 볼륨(`volume-default`) 요약 프롬프트, 공통 분량 지시(`target-directive`), 빈 템플릿 |
| `src/backend/presets.ts` | 위 파일을 내장 프리셋으로 등록하는 곳 (프리셋 **표시 이름**만 카탈로그) |
| `src/prompts/memoria/persona.txt`, `short-comment-rules.txt` | 메모리아 페르소나·짧은 코멘트 규칙 (`src/backend/memoria.ts`) |
| `src/prompts/codex/directives.txt` | 코덱스 기본 지시 (내장 코덱스 프리셋) |
| `src/prompts/codex/passes/*.txt` | 코덱스 패스: update, refresh, rebuild, reconcile, tidy, verify, catchup-fast/ultra |
| `src/prompts/codex/protocol/*.txt` | 쓰기 프로토콜(도구 호출/JSON, 순차/일괄), 패치 규칙 |
| `src/prompts/codex/schema/*.txt` | 코덱스 파일 스키마 설명 |
| `src/prompts/codex/notes/*.txt` | 상황별 메모(잠금 필드, 마이그레이션, 복구 등) |
| `src/prompts/codex/registry.ts` | 위 템플릿 등록부 (템플릿 **라벨·설명**만 카탈로그) |
| `src/prompts/fill.ts` | `{{…}}` 자리 채우기 |
| `src/shared.ts`의 `MODEL_TIER_NAMES` 및 그 아래 단계 라벨 | 모델에게 보내는 영어 단계 이름(화면용 `TIER_NAMES`와 분리됨) |
| `src/backend/summarizer.ts`, `src/backend/codex/prompt.ts`, `src/backend/codex/agent.ts`, `src/backend/codex/index.ts` | 프롬프트 조립과 에이전트 루프 안의 영어 문구(예: `RAW TURNS …`, 도구 오류 피드백) |
