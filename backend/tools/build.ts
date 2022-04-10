import { exec } from 'child_process';
import clean from './clean';
async function main() {
  await clean();
  await build();
}
export default async function build() {
  exec('tsc --project ./');
}
if (typeof require !== 'undefined' && require.main === module) {
  main();
}
