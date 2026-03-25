import type { UIAdapterModule, TranscriptEntry } from "../types";
import type { CreateConfigValues } from "@paperclipai/adapter-utils";
import { HermesLocalConfigFields } from "./config-fields";

function parseHermesStdoutLine(line: string, ts: string): TranscriptEntry[] {
  return [{ type: "stdout", text: line, ts }];
}

function buildHermesConfig(values: CreateConfigValues): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  if (values.model) config.model = values.model;
  const raw = values as Record<string, unknown>;
  if (raw.toolsets) config.toolsets = raw.toolsets;
  if (raw.timeoutSec) config.timeoutSec = Number(raw.timeoutSec);
  config.persistSession = true;
  return config;
}

export const hermesLocalUIAdapter: UIAdapterModule = {
  type: "hermes_local",
  label: "Hermes Agent",
  parseStdoutLine: parseHermesStdoutLine,
  ConfigFields: HermesLocalConfigFields,
  buildAdapterConfig: buildHermesConfig,
};
