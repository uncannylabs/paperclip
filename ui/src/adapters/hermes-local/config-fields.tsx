import type { AdapterConfigFieldsProps } from "../types";
import {
  Field,
  DraftInput,
} from "../../components/agent-config-primitives";

const inputClass =
  "w-full rounded-md border border-border px-2.5 py-1.5 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/40";

export function HermesLocalConfigFields({
  isCreate,
  values,
  set,
  config,
  eff,
  mark,
  models,
}: AdapterConfigFieldsProps) {
  if (isCreate) {
    return (
      <>
        <Field label="Model" hint="LLM model in provider/model format">
          <select
            className={inputClass}
            value={values?.model ?? ""}
            onChange={(e) => set?.({ model: e.target.value })}
          >
            <option value="">Default (anthropic/claude-sonnet-4)</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }

  return (
    <>
      <Field label="Model" hint="LLM model in provider/model format">
        <DraftInput
          value={eff("adapterConfig", "model", (config.model as string) ?? "")}
          onChange={(v: string) => mark("adapterConfig", "model", v)}
          placeholder="anthropic/claude-sonnet-4"
          className={inputClass}
        />
      </Field>
      <Field label="Toolsets" hint="Comma-separated tools (terminal,file,web,browser,git)">
        <DraftInput
          value={eff("adapterConfig", "toolsets", (config.toolsets as string) ?? "")}
          onChange={(v: string) => mark("adapterConfig", "toolsets", v)}
          placeholder="terminal,file,web"
          className={inputClass}
        />
      </Field>
      <Field label="Timeout (seconds)" hint="Max execution time per heartbeat">
        <DraftInput
          value={String(eff("adapterConfig", "timeoutSec", (config.timeoutSec as number) ?? 300))}
          onChange={(v: string) => mark("adapterConfig", "timeoutSec", Number(v))}
          placeholder="300"
          className={inputClass}
        />
      </Field>
    </>
  );
}
