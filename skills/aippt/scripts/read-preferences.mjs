import { loadPreferences, parseArgs } from "./_shared.mjs";

const args = parseArgs(process.argv);
const result = loadPreferences(args.path);

if (!result) {
  console.log(
    JSON.stringify(
      {
        found: false,
        path: null,
        preferences: null
      },
      null,
      2
    )
  );
  process.exit(0);
}

console.log(
  JSON.stringify(
    {
      found: true,
      path: result.path,
      preferences: result.preferences
    },
    null,
    2
  )
);
