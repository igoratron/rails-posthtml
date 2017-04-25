const React = require('react');
const posthtml = require('posthtml');
const through = require('through2');

const plugins = [
  require('posthtml-static-react')('r-hero', {
    'r-hero': radiusHero
  })
];

process.stdin
  .pipe(posthtmlStream())
  .pipe(process.stdout);

function posthtmlStream() {
  return through((chunk, enc, cb) => {
    posthtml(plugins)
      .process(chunk.toString())
      .then((result) => {
        chunk = new Buffer(result.html);
        cb(null, chunk);
      })
      .catch((err) => {
        cb(new Error(err));
      });
  });
}

function radiusHero () {
  return React.createElement(
    "section",
    { "className": "functional-hero" },
    React.createElement(
      "div",
      { "className": "functional-hero__inner" },
      React.createElement(
        "div",
        { "className": "functional-hero__content" },
        React.createElement(
          "h1",
          null,
          "Fake title"
        ),
        React.createElement(
          "p",
          null,
          "Fake copy dfjfgbjg djjkbv"
        ),
        React.createElement(
          "button",
          null,
          "Apply now"
        )
      )
    ),
    React.createElement("div", { "className": "functional_hero__trustpilot" })
  );
};

