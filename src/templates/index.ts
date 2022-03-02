import chalk from 'chalk';
import * as ejs from 'ejs';
import * as fse from 'fs-extra';
import * as klawSync from 'klaw-sync';
import * as path from 'path';

import { templatePath } from '../settings';

interface TemplateDictionary  {
  name: string;
  description?: string;
}

function getPathForTemplate(template: string): string {
  return path.resolve(templatePath, template);
}

async function updateFile(path: string, dictionary: TemplateDictionary): Promise<void> {
  const file = await fse.readFile(path);
  return fse.writeFile(path, ejs.render(file.toString(), dictionary));
}

async function updateTemplateFiles(name: string, description = ''): Promise<void> {
  const files = klawSync(name, { nodir: true });
  const dict = { name, description };
  await Promise.all(files.map(file => updateFile(file.path, dict)));
}

export async function generateProjectFromTemplate(template: string, name: string, description = ''): Promise<void> {
  const templatePath = getPathForTemplate(template);

  // copy template files to new project directory
  fse.copySync(templatePath, name, { overwrite: false });

  await updateTemplateFiles(name, description);

  console.log(chalk.green(`Your new project has been created at ./${name}`));
}






