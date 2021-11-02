async function main() {
  await clean();
  await create();
  await seed();
}

async function clean() {
  console.log('cleaning up database ...');
}
async function create() {
  console.log('creating database ...');
}
export default async function seed() {
  console.log('seeding database');
}
if (typeof require !== 'undefined' && require.main === module) {
  main();
}
