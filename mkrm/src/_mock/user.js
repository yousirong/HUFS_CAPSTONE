import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map(() => ({
  company: faker.company.companyName(),
  name: faker.company.companyName(),
  id: faker.datatype.uuid(),
  avartarUrl: faker.image.avatar(),
  isnew: faker.datatype.boolean(), // 신규 인지 아닌지
  status: sample(['not yet', 'Proceeding', 'complete', 'failure']),
  repnum: faker.phone.phoneNumber('02-####-####'),
  role: sample([
    '리더',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
