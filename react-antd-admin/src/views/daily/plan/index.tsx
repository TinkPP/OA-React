import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Progress,
  Select,
  Table,
  TimePicker
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useEffect } from 'react';

const format = 'HH:mm';

export const Plan = () => {
  const [form] = useForm();

  const columns: any = [
    {
      title: '工作内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      render: (item: any, record: any, index: number) => {
        return (
          <Form.Item name={['table', index, 'content']} noStyle>
            <Input placeholder="请输入工作内容..." bordered={false}></Input>
          </Form.Item>
        );
      }
    },
    {
      title: '工作目标',
      dataIndex: 'target',
      key: 'target',
      align: 'center',
      render: (item: any, record: any, index: number) => {
        return (
          <Form.Item name={['table', index, 'target']} noStyle>
            <Input placeholder="请输入工作目标..." bordered={false}></Input>
          </Form.Item>
        );
      }
    },
    {
      title: '工作优先级',
      dataIndex: 'priority',
      key: 'priority',
      align: 'center',
      width: 80,
      render: (item: any, record: any, index: number) => {
        return (
          <Form.Item name={['table', index, 'priority']} noStyle>
            <Select
              defaultValue="lucy"
              bordered={false}
              style={{ width: 80 }}
              options={[
                {
                  value: 'A',
                  label: 'A'
                },
                {
                  value: 'B',
                  label: 'B'
                },
                {
                  value: 'C',
                  label: 'C'
                },
                {
                  value: 'D',
                  label: 'D'
                }
              ]}
            />
          </Form.Item>
        );
      }
    },
    {
      title: '预计完成时间',
      dataIndex: 'completion_time',
      key: 'completion_time',
      align: 'center',
      width: 120,
      render: (item: any, record: any, index: number) => {
        return (
          <Form.Item name={['table', index, 'completion_time']} noStyle>
            <TimePicker format={format} bordered={false} style={{ width: 80 }} />
          </Form.Item>
        );
      }
    },
    {
      title: '工作完成度',
      dataIndex: 'completion_degree',
      key: 'completion_degree',
      align: 'center',
      render: (item: any, record: any, index: number) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Progress
              percent={item ? item : 0}
              showInfo={false}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068'
              }}
            />
            <Form.Item name={['table', index, 'completion_degree']} noStyle>
              <InputNumber min={0} max={100} precision={0} addonAfter="%" controls={false} bordered={false} />
            </Form.Item>
          </div>
        );
      }
    },
    {
      title: '操作',
      width: 60,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record: any) => (
        <Popconfirm
          key="del"
          placement="left"
          title="你确定要删除该工作安排吗?"
          onConfirm={() => {
            let { table } = form.getFieldsValue();
            table = table.filter((item: any) => item.key !== record.key);
            form.setFieldsValue({ table });
          }}
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ];

  const Footer = (
    <div>
      <Button
        type="dashed"
        onClick={() => {
          const { table } = form.getFieldsValue();
          table.push({
            key: table.length + 1,
            content: '',
            target: '',
            priority: 'A',
            completion_time: moment('00:00', 'HH:mm'),
            completion_degree: 0
          });
          form.setFieldsValue({ table });
        }}
        block
        icon={<PlusOutlined />}
      >
        添加工作安排
      </Button>
    </div>
  );

  useEffect(() => {
    form.setFieldsValue({
      table: [
        {
          key: 1,
          content: '杀死知更鸟',
          target: '全部干掉',
          priority: 'A',
          completion_time: moment('12:06', 'HH:mm'),
          completion_degree: 80
        },
        {
          key: 2,
          content: '探访基层',
          target: '走访200户',
          priority: 'C',
          completion_time: moment('14:50', 'HH:mm'),
          completion_degree: 40
        }
      ]
    });
  }, []);

  const onFinish = (value: any) => {
    console.log(value);
    message.success('保存成功');
  };

  return (
    <div className="plan-table">
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="table" valuePropName="dataSource">
          <Table
            columns={columns}
            footer={() => Footer}
            title={() => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item name="date" initialValue={moment()} noStyle>
                  <DatePicker />
                </Form.Item>
                <Form.Item noStyle>
                  <Button type="primary" htmlType="submit" size="large">
                    保存
                  </Button>
                </Form.Item>
              </div>
            )}
            pagination={false}
            bordered
          ></Table>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Plan;
