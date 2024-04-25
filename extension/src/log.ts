export default function log(
  type: string,
  category: string,
  ...messages: any[]
) {
  if (messages.length > 0)
    console.log(
      `%c 치직치지직 %c ${type} %c ${category} %c `,
      "background: #3bc460; padding: 2px 4px; border-radius: 4px 0px 0px 4px; color: white;",
      "background: #0B73F5; padding: 2px 4px; color: white;",
      "background: #192226; padding: 2px 4px; border-radius: 0px 4px 4px 0px; color: white;",
      "",
      ...messages
    );
  else
    console.log(
      `%c 치직치지직 %c ${type} %c`,
      "background: #3bc460; padding: 2px 4px; border-radius: 4px 0px 0px 4px; color: white;",
      "background: #0B73F5; padding: 2px 4px; border-radius: 0px 4px 4px 0px; color: white;",
      "",
      category
    );
}
