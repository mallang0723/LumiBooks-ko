import { describe, expect, test } from "bun:test";
import { IntlMessageFormat } from "intl-messageformat";
import { BUNDLED_CATALOGS, createTranslator } from "./index";
import english from "../locales/en.json";
import korean from "../locales/ko.json";
import { flattenCatalog, messageArguments } from "../../scripts/locale-tools";

// LumiBooks-ko fork: guards for the bundled Korean catalog.
const ko = createTranslator("ko", BUNDLED_CATALOGS);
const en = flattenCatalog(english);
const kr = flattenCatalog(korean);

describe("Korean catalog", () => {
  test("covers every English message with matching arguments", () => {
    expect([...kr.keys()].filter(key => !en.has(key))).toEqual([]);
    expect([...en.keys()].filter(key => !kr.has(key))).toEqual([]);
    for (const [key, message] of kr) {
      const args = messageArguments(message, "ko");
      expect([...args].sort(), key).toEqual([...messageArguments(en.get(key)!)].sort());
      for (const count of [0, 1, 2]) {
        const values = Object.fromEntries([...args].map(name => [name, count]));
        expect(typeof new IntlMessageFormat(message, "ko", undefined, { ignoreTag: true }).format(values), key).toBe("string");
      }
    }
  });

  test("is used by the ko translator, with English fallback for omitted keys", () => {
    expect(ko("ui.common.messageCount", { count: 3 })).not.toBe("3 msgs");
    expect(ko("ui.common.messageCount", { count: 3 })).toContain("3");
    expect(createTranslator("ko", { ko: {} })("ui.common.messageCount", { count: 3 })).toBe("3 msgs");
  });

  test("keeps strings that code matches or stores locale-stable", () => {
    // rebase.ts and summary-backup.ts match the literal "[Root]" prefix.
    expect(ko("backend.pipeline.comment.arc", { choice: "yes", sceneNumber: 4, baseComment: "x" }).startsWith("[Root] ")).toBe(true);
    // world-book.ts recognises LumiBooks books by their name prefix.
    expect(ko("shared.codexBookNameFor.codexDoNotEdit", { worldBookNamePrefix: "LumiBooks", suffix: "x" }).startsWith("LumiBooks")).toBe(true);
    expect(ko("backend.summaryBackup.exportSummaryLorebook.lumiBooksSummaries", { slice: "x" }).startsWith("LumiBooks")).toBe(true);
    // Messages the code uses as settings keys, entity ids, a CSS class, or a media query.
    for (const id of [
      "ui.tabs.profileTab.change.targetUnit",
      "ui.tabs.profileTab.change.targetPercent",
      "ui.tabs.profileTab.change.targetTokens",
      "ui.lessons.contentCodex.courseCodex.charElias",
      "ui.lessons.contentCodex.courseCodex.charCaptain",
      "ui.tabs.codexTab.renderRelationGraph.group",
      "ui.lessons.diploma.renderDiploma.prefersReducedMotionReduce",
    ]) expect(kr.get(id), id).toBe(en.get(id));
  });

  test("lesson exhibits quote the Korean error text the app shows", () => {
    const chapter = ko("backend.pipeline.failToast.memoriaCouldnT", {
      noun: ko("backend.pipeline.noun.fileTheChapter"),
      shortErrorText: ko("backend.summarizer.parseSummaryJson.theModelDidnTReturnValidJson"),
    });
    expect(ko("ui.lessons.contentBooks.courseBooks.memoriaCouldnTFileTheChapterThe")).toBe(chapter);
    const prefix = ko("backend.codex.index.reportCodexFailure.memoriaCouldnTTheCodex", { verb: "update", shortErrorText: "" });
    const exhibit = ko("ui.lessons.contentCodex.courseCodex.memoriaCouldnTUpdateTheCodexThe");
    expect(exhibit.startsWith(prefix)).toBe(true);
    expect(ko("backend.codex.agent.runCodexAgentInner.theCodexAgentNarratedInsteadOfCalling").startsWith(exhibit.slice(prefix.length))).toBe(true);
  });
});
