import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// myshop 매장 더미데이터 Array(더미데이터 개수)
// ----------------------------------------------------------------------

const users = [...Array(100)].map(() => ({
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
  location: sample([
    '서울시',
    '경기도',
    '충청남도',
    '충청북도',
    '강원도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주도',
    '서울특별시',
    '인천광역시',
    '대전광역시',
    '대구광역시',
    '울산광역시',
    '부산광역시',
    '관주광역시',
    '세종특별자치시',
  ]),
}));

export default users;
