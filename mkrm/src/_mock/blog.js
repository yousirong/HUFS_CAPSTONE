import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'example1',
  'example2',
  'example3',
  'example4',
  'example5',
  'example6',
  'example7',
  'example8',
  'example9',
  'example10',
  'example11',
  'example12',
  'example13',
  'example14',
  'example15',
  'example16',
  'example17',
  'example18',
  'example19',
  'example20',
  'example21',
  'example22',
  'example23',
  'example24',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  //   cover: `/static/mock-images/covers/cover_${index + 1}.jpg`,
  cover: faker.image.avatar(),
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.findName(),
    // avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    avartarUrl: faker.image.avatar(),
  },
}));

export default posts;
