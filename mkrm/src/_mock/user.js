import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// myshop 더미데이터
// ----------------------------------------------------------------------

const users = [...Array(24)].map(() => ({
  company: faker.company.companyName(), // 매장이름
  name: faker.company.companyName(), // 대표자이름
  id: faker.datatype.uuid(), // 매장 고유번호
  avartarUrl: faker.image.avatar(),
  isnew: faker.datatype.boolean(), // 신규 인지 아닌지
  status: sample(['not yet', 'Proceeding', 'complete', 'failure']),
  repnum: faker.phone.phoneNumber('02-####-####'), // 대표번호
  sector: sample([
    // role -> sector업종
    '한식',
    '중식',
    '일식',
    '양식',
  ]),
}));

export default users;
