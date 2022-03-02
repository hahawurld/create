import * as figlet from 'figlet';
import chalk from 'chalk';

export function printBanner(...text: string[]): void {
  text.forEach(line => {
    console.log(chalk.green(figlet.textSync(line, '3D-ASCII')));
  });
}
