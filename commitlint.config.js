const config = require("@commitlint/config-conventional");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    ...config.rules,
    "type-enum": [2, "always", [...config.rules["type-enum"][2], "wip"]],
  },
  prompt: {
    ...config.prompt,
    questions: {
      ...config.prompt.questions,
      type: {
        ...config.prompt.questions.type,
        enum: {
          ...config.prompt.questions.type.enum,
          wip: {
            description: "Working in progress",
            title: "Wip",
            emoji: "🚧",
          },
        },
      },
    },
  },
};
