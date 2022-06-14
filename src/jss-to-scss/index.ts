import replacements from "./replacements";

export default function (s: string): string {
  s = replacements(s, [
    {
      // css rules
      pattern: /([ \t]*)([^ \n][^:\n]+): +([^\{ \n].*[^,\n]?),?/g,
      replacement: (_, $1, $2, $3) => {
        $2 = camelPascalCaseToKebabCase($2);

        $3 = replacements($3, [
          {
            pattern: /,$/,
            replacement: "",
          },
          {
            pattern: /^[^'"\d]+$/,
            replacement: "$$$&",
          },
          {
            pattern: /^["'](.+)["']$/,
            replacement: "$1",
          },
        ]);

        if ($2 === "content") {
          $3 = $3.replace(/^["'](.+)["']$/, '"$1"');
        }

        return $1 + $2 + ": " + $3 + ";";
      },
    },
    {
      // css selector
      pattern:
        /([ \t]*)(["']?)([\w-\.&>@+~:\*][\w\d-\.&>@+~:\*\(\) ]*)(["']?): *\{/g,
      replacement: (_, $1, $2, $3, $4) => {
        if ($2 === "" && $4 === "") {
          $3 = "$" + $3;
        }
        return `${$1 + $3} {`;
      },
    },
    {
      pattern: /\},/g,
      replacement: "}",
    },
  ]);

  return s;
}

function camelPascalCaseToKebabCase(s: string): string {
  return s.replace(/(.)([A-Z])/g, "$1-$2").toLowerCase();
}
function t(n: number): string {
  return "_TEST" + n;
}
