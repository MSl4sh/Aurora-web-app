declare module '*/documentation.json' {
  interface Command {
    name: string;
    description: string;
    usage: string;
    permissions?: string;
  }

  interface Category {
    name: string;
    commands: Command[];
  }

  interface Documentation {
    bot_name: string;
    description: string;
    categories: {
      [key: string]: Category;
    };
  }

  const documentation: Documentation;
  export default documentation;
} 