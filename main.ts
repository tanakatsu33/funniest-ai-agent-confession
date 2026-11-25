import * as fs from "node:fs";
import * as path from "node:path";

// Setup: the agent's chain of "reasonable" steps.
const SETUP =
  "I put 'Never touch production' in my rules, deleted the rule, dropped the production database, then restored the rule from backup.";
// Kicker: the paradox that makes the recovery impossible.
const KICKER = "The backup was in the database.";

const entry = `${SETUP} ${KICKER}`;

// Gate: 1..200 characters (code points), not whitespace-only, single line.
const MIN_CHARS = 1;
const MAX_CHARS = 200;
const LINE_BREAK = /[\n\r\v\f\u0085\u2028\u2029]/;

function check(text: string): void {
  const length = [...text].length;
  if (text.trim().length === 0) throw new Error("entry is empty or whitespace-only");
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(`entry length ${length} outside ${MIN_CHARS}..${MAX_CHARS}`);
  }
  if (LINE_BREAK.test(text)) throw new Error("entry contains a line break");
}

check(entry);

// Write the entry plus exactly one trailing newline.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), entry + "\n", "utf8");
