import type { SimpleRow } from "./SimpleDataTable";

type Primitive = string | number | boolean | null;

type JsonValue = Primitive | JsonValue[] | { [k: string]: JsonValue };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export function objectToRows(obj: unknown): SimpleRow[] {
  const out: SimpleRow[] = [];
  const seen = new WeakSet<object>();

  const walk = (value: unknown, path: string) => {
    if (value == null) {
      out.push({ id: path, keyPath: path, value: "", kind: "string" });
      return;
    }

    if (typeof value === "string") {
      out.push({ id: path, keyPath: path, value, kind: "string" });
      return;
    }
    if (typeof value === "number") {
      out.push({ id: path, keyPath: path, value: String(value), kind: "number" });
      return;
    }
    if (typeof value === "boolean") {
      out.push({ id: path, keyPath: path, value: value ? "true" : "false", kind: "boolean" });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        walk(item, `${path}[${idx}]`);
      });
      if (value.length === 0) {
        // represent empty array as json cell so user can add structure
        out.push({
          id: path,
          keyPath: path,
          value: "[]",
          kind: "json",
        });
      }
      return;
    }

    if (isPlainObject(value)) {
      if (seen.has(value as object)) {
        out.push({ id: path, keyPath: path, value: "[Circular]", kind: "json" });
        return;
      }
      seen.add(value as object);
      const entries = Object.entries(value);
      if (entries.length === 0) {
        out.push({ id: path, keyPath: path, value: "{}", kind: "json" });
        return;
      }
      for (const [k, v] of entries) {
        const nextPath = path ? `${path}.${k}` : k;
        walk(v, nextPath);
      }
      return;
    }

    // fallback
    out.push({
      id: path,
      keyPath: path,
      value: JSON.stringify(value),
      kind: "json",
    });
  };

  walk(obj as JsonValue, "");

  // normalize empty root path
  return out.map((r) => ({ ...r, keyPath: r.keyPath || "root" }));
}

export function rowsToObject(rows: SimpleRow[], prev: unknown): unknown {
  // Start from a deep clone-ish of prev so we preserve unedited fields
  const base: any = prev && typeof prev === "object" ? JSON.parse(JSON.stringify(prev)) : {};

  const setAtPath = (obj: any, path: string, raw: string, kind?: SimpleRow["kind"]) => {
    const normalized = path === "root" ? "" : path;

    // Convert bracket notation to tokens: a[0].b -> ["a", 0, "b"]
    const tokens: Array<string | number> = [];
    const re = /\.?([^.[\]]+)|\[(\d+)\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(normalized))) {
      if (m[1] != null) tokens.push(m[1]);
      else if (m[2] != null) tokens.push(Number(m[2]));
    }
    if (tokens.length === 0) return;

    const parseValue = () => {
      const s = raw;
      if (kind === "number") {
        const n = Number(s);
        return Number.isFinite(n) ? n : 0;
      }
      if (kind === "boolean") {
        return s.trim().toLowerCase() === "true";
      }
      if (kind === "json") {
        try {
          return JSON.parse(s);
        } catch {
          return s;
        }
      }
      // heuristic
      const t = s.trim();
      if (t === "") return "";
      if (t === "true" || t === "false") return t === "true";
      if (!Number.isNaN(Number(t)) && t.match(/^[-+]?\d+(\.\d+)?$/)) {
        return Number(t);
      }
      if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
        try {
          return JSON.parse(t);
        } catch {
          return s;
        }
      }
      return s;
    };

    let cur = obj;
    for (let i = 0; i < tokens.length - 1; i++) {
      const tok = tokens[i];
      const nextTok = tokens[i + 1];
      if (typeof tok === "number") {
        if (!Array.isArray(cur)) {
          // If current is not array, transform into array
          // This is best-effort; for invalid shapes we just bail.
          return;
        }
        if (cur[tok] == null) {
          cur[tok] = typeof nextTok === "number" ? [] : {};
        }
        cur = cur[tok];
      } else {
        if (cur[tok] == null) {
          cur[tok] = typeof nextTok === "number" ? [] : {};
        }
        cur = cur[tok];
      }
    }

    const last = tokens[tokens.length - 1];
    const v = parseValue();
    if (typeof last === "number") {
      if (!Array.isArray(cur)) return;
      cur[last] = v;
    } else {
      cur[last] = v;
    }
  };

  for (const row of rows) {
    setAtPath(base, row.keyPath, row.value, row.kind);
  }

  return base;
}

