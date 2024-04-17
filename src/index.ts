import {Command, flags} from '@oclif/command'
import Enquirer from 'enquirer';
import { kebabCase } from 'lodash';

import { generateProjectFromTemplate } from './templates';
import { printBanner } from './utils';

const enquirer = new Enquirer();
const templates = ['js', 'action-js', 'ts'];

class Create extends Command {
  static description = 'An NPM initializer for hahawurld projects'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    template: flags.string({
      char: 't',
      description: 'initializer template to use',
      options: templates,
    }),
    description: flags.string({
      char: 'd',
      description: 'a description of project being generated'
    }),
  }

  static args = [{name: 'name'}]

  async run(): Promise<void> {
    printBanner('haha', 'wurld');
    console.log('Welcome to the hahawurld initializer');
    const {args, flags} = this.parse(Create)
    let template = flags.template;
    let description = flags.description;
    let name = args.name;

    if (!template) {
      const result: any = await enquirer.prompt({
        name: 'template',
        message: 'What kind of project would you like to create?',
        choices: [
          { message: 'TypeScript', name: 'ts' },
          { message: 'JavaScript', name: 'js' },
          { message: 'GitHub JavaScript Action', name: 'action-js' },
        ],
        type: 'select',
      });

      template = result.template as string;
    }

    if (!name) {
      const result: any = await enquirer.prompt({
        name: 'description',
        message: 'Please provide a name for your new project',
        type: 'text',
        required: true,
      });

      name = result.description as string;
    }

    if (!description) {
      const result: any = await enquirer.prompt({
        name: 'description',
        message: 'Provide a brief description of the project you\'re creating',
        type: 'text',
      });

      description = result.description as string;
    }

    const cleanName = kebabCase(name);

    generateProjectFromTemplate(template, cleanName, description);
  }
}

export = Create
