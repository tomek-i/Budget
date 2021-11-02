import clean from './clean';
async function main() {
  await clean();
  await tests();
}
export default async function tests() {
  console.log('running tests');
}
if (typeof require !== 'undefined' && require.main === module) {
  main();
}
