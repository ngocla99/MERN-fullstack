import { Select } from 'antd';
import Card from '../shared/components/UIElements/Card';
import { SectionDev } from './Develop.style';

const Develop = () => {
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + 'Ngoc khong co nguoi iu, chan lam ;))))'}</Option>,
    );
  }

  return (
    <SectionDev>
      <Card>
        <Select
          mode='multiple'
          style={{
            width: '20%',
          }}
          size='middle'
          placeholder='Tags Mode'
        >
          {children}
        </Select>
        <Select
          mode='tags'
          style={{
            width: '20%',
          }}
          size='middle'
          placeholder='Tags Mode'
        >
          {children}
        </Select>
      </Card>
    </SectionDev>
  );
};

export default Develop;
