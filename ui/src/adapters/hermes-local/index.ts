import type { UIAdapterModule, TranscriptEntry, CreateConfigValues } from "../types";
import { HermesLocalConfigFields } from "./config-fields";

function parseHermesStdoutLine(line: string, ts: string): TranscriptEntry[] {
  return [{ type: "stdout", text: line, ts }];
}

function buildHermesConfig(values: CreateConfigValues): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  if (values.model) config.model = values.model;
  config.persistSession = true;
  config.timeoutSec = 300;
  return config;
}

export const hermesLocalUIAdapter: UIAdapterModule = {
  type: "hermes_local",
  label: "Hermes Agent",
  parseStdoutLine: parseHermesStdoutLine,
  ConfigFields: HermesLocalConfigFields,
  buildAdapterConfig: buildHermesConfig,
};
