import { t as tr } from "../../i18n";
import { CODEX_ENTRY_EXTENSION_KEY } from "../../shared";
import { clearBusy, setBusy } from "../pipeline";
import { findCodexBookForChat, listAllEntries } from "../world-book";
import { listCodexChatIds } from "./store";
import { readEntryMeta, syncCodexEntries } from "./sync";
import { repairCodexReferences } from "./repair";
import { EDITABLE_CODEX_FIELDS } from "./lorebook-edits";
import { AGENT_DOCS, DOCS_HINT, DOCS_SURFACE } from "../agent-docs";
declare const spindle: import("lumiverse-spindle-types").SpindleAPI;

const SURFACE = "lumi_books.codex";
const manifest = {
  extension: { id: "lumi_books", name: "LumiBooks" },
  surfaces: [{ id: SURFACE, label: tr("backend.codex.lumiagent.surfaceLabel"), scope: "global",
    description: tr("backend.codex.lumiagent.surfaceDescription") },
    { id: DOCS_SURFACE, label: tr("backend.codex.lumiagent.docsSurfaceLabel"), scope: "global",
      description: tr("backend.codex.lumiagent.docsSurfaceDescription") }],
};

export async function handleLumiAgentCodex(request: Record<string, unknown>, changed: (userId: string, chatId: string) => void): Promise<unknown> {
  if (request.op === "describe") return manifest;
  if (request.surfaceId === DOCS_SURFACE) {
    if (request.op === "list_items") return { items: AGENT_DOCS.map(({ id, label }) => ({ id, label })), total: AGENT_DOCS.length };
    if (request.op === "read_item") {
      if (request.field !== undefined && request.field !== "text") throw new Error("Read a whole LumiBooks topic or field text");
      const topic = AGENT_DOCS.find(topic => topic.id === request.itemId);
      if (!topic) throw new Error("Unknown LumiBooks topic. List lumibooks_docs first");
      return { value: topic.text };
    }
    if (request.op === "write_field") return { ok: false, error: "LumiBooks documentation is read-only" };
    throw new Error("Unknown LumiBooks documentation operation");
  }
  const userId = request.userId;
  if (typeof userId !== "string" || !userId) throw new Error(tr("backend.codex.lumiagent.missingUserId"));
  if (request.op === "system_prompt") return { text: DOCS_HINT };
  if (request.op === "check_read" || request.op === "check_write") return { ok: true };
  if (request.surfaceId !== SURFACE) throw new Error(tr("backend.codex.lumiagent.unknownSurface"));
  if (request.op === "list_items") {
    const items: unknown[] = [];
    for (const chatId of await listCodexChatIds(userId)) {
      const chat = await spindle.chats.get(chatId, userId);
      if (!chat || (typeof request.characterId === "string" && chat.character_id !== request.characterId)) continue;
      const bookId = await findCodexBookForChat(chatId, userId);
      if (!bookId) continue;
      for (const entry of await listAllEntries(bookId, userId)) {
        if (readEntryMeta(entry)?.chatId !== chatId) continue;
        items.push({ id: entry.id, label: `${chat.name || chatId} / ${entry.comment}`, brief: { chatId, bookId, key: entry.key, constant: entry.constant, vectorized: entry.vectorized, disabled: entry.disabled } });
      }
    }
    return { items, total: items.length };
  }
  if (typeof request.itemId !== "string") throw new Error(tr("backend.codex.lumiagent.missingRecordId"));
  const entry = await spindle.world_books.entries.get(request.itemId, userId);
  const meta = entry && readEntryMeta(entry);
  if (!entry || !meta || !(await spindle.chats.get(meta.chatId, userId))) throw new Error(tr("backend.codex.lumiagent.recordNotFound"));
  if (await findCodexBookForChat(meta.chatId, userId) !== entry.world_book_id) throw new Error(tr("backend.codex.lumiagent.outsideBook"));
  const field = request.field;
  const controls = ["repair_references", "reset_overrides"];
  if (request.op === "read_item") {
    const value = { ...Object.fromEntries(EDITABLE_CODEX_FIELDS.map(key => [key, entry[key]])), repair_references: false, reset_overrides: false };
    if (field !== undefined && (typeof field !== "string" || !Object.hasOwn(value, field))) throw new Error(tr("backend.codex.lumiagent.unknownField"));
    return { value: typeof field === "string" ? (value as Record<string, unknown>)[field] : value, meta: { chatId: meta.chatId, file: meta.file, record: meta.record } };
  }
  if (request.op !== "write_field" || typeof field !== "string") throw new Error(tr("backend.codex.lumiagent.unknownOperation"));
  if (!(EDITABLE_CODEX_FIELDS as readonly string[]).includes(field) && !controls.includes(field)) throw new Error(tr("backend.codex.lumiagent.unknownField"));
  const value = request.value;
  if (["key", "keysecondary"].includes(field)) {
    if (!Array.isArray(value) || !value.every(v => typeof v === "string")) throw new Error(tr("backend.codex.lumiagent.keywordsArray"));
  } else if (["constant", "vectorized", "disabled", ...controls].includes(field)) {
    if (typeof value !== "boolean") throw new Error(tr("backend.codex.lumiagent.expectedBoolean"));
  } else if (["position", "depth"].includes(field)) {
    if (!Number.isInteger(value) || (value as number) < 0) throw new Error(tr("backend.codex.lumiagent.expectedNonnegativeInteger"));
  } else if (typeof value !== "string") throw new Error(tr("backend.codex.lumiagent.expectedText"));
  if (field === "role" && !["system", "user", "assistant"].includes(value as string)) throw new Error(tr("backend.codex.lumiagent.invalidRole"));
  if (!setBusy(userId, meta.chatId, "codex", tr("codexLorebook.agentBusy"))) throw new Error(tr("backend.codex.lumiagent.busy"));
  try {
    if (field === "repair_references") {
      if (value) await repairCodexReferences(meta.chatId, userId, true);
    } else if (field === "reset_overrides") {
      if (value) await spindle.world_books.entries.update(entry.id, { extensions: { ...entry.extensions, [CODEX_ENTRY_EXTENSION_KEY]: {
        ...meta, overrides: {}, applied: Object.fromEntries(EDITABLE_CODEX_FIELDS.map(key => [key, entry[key]])),
      } } }, userId);
    } else {
      await spindle.world_books.entries.update(entry.id, { [field]: value }, userId);
    }
    await syncCodexEntries(meta.chatId, userId);
    changed(userId, meta.chatId);
    return { ok: true };
  } finally { clearBusy(userId, meta.chatId, "codex"); }
}

export function registerLumiAgentCodex(changed: (userId: string, chatId: string) => void): void {
  spindle.rpcPool.handle("lumi_books.phoneline", async ctx => {
    if (ctx.requesterExtensionId !== "lumiagent") throw new Error(tr("backend.codex.lumiagent.unauthorizedCaller"));
    const request = await spindle.rpcPool.read<Record<string, unknown>>("lumiagent.phoneline_request");
    if (!request || typeof request !== "object") throw new Error(tr("backend.codex.lumiagent.invalidRequest"));
    return handleLumiAgentCodex(request, changed);
  }, { requires: ["characters", "chats", "world_books"] });
}
