const { parseLine } = require("../bin/lib");

test("Parse test line", () => {
  const parsedLine = parseLine(`           define("test", "test value");`);

  expect(parsedLine?.groups?.name).toBe("test");
});

test("Parse real life line", () => {
  const parsedLine = parseLine(
    "define('NONCE_SALT',       'x$L0!PEd^-Ub-!c8DbqrMDX4 __+e<vIMS4#a3YD0sWz>sDC?L|c@#.H4Yk~O`jE');"
  );

  expect(parsedLine?.groups?.value).toBe(
    "x$L0!PEd^-Ub-!c8DbqrMDX4 __+e<vIMS4#a3YD0sWz>sDC?L|c@#.H4Yk~O`jE"
  );
});

test("Parse misformed line", () => {
  const parsedLine = parseLine(`define("no value hear");`);

  expect(parsedLine).toBeNull();
});
