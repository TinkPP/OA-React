import './index.less';

import { useRequest } from 'ahooks';
import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import moment from 'moment';

import { getSummarize, saveSummarize } from '@/api/system/daily';

const { TextArea } = Input;

export const Summarize = () => {
  const { data, loading, run } = useRequest(getSummarize, {
    manual: false,
    onSuccess: () => {
      message.success('数据刷新成功');
    }
  });

  const { run: save } = useRequest(saveSummarize, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功');
      run();
    }
  });

  const onFinish = (values: any) => {
    if (values) {
      save(values);
    } else return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ width: '100%' }} loading={loading}>
            <div className="summarize-top">
              <div className="summarize-title">今日总结</div>
              <div className="summarize-time">{moment().format('YYYY年MM月DD日')}</div>
            </div>

            <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <div className="summarize-question">今天我在哪些方面做得比较好?</div>
              <Form.Item
                name="summarize_one"
                rules={[{ required: true, message: '内容不得为空' }]}
                initialValue={data?.summarize_today?.summarize_one}
              >
                <TextArea placeholder="请输入内容..." autoSize={{ minRows: 5, maxRows: 7 }} allowClear />
              </Form.Item>

              <div className="summarize-question">今天我在哪些方面可以做得更好?</div>
              <Form.Item
                name="summarize_two"
                rules={[{ required: true, message: '内容不得为空' }]}
                initialValue={data?.summarize_today?.summarize_two}
              >
                <TextArea placeholder="请输入内容..." autoSize={{ minRows: 5, maxRows: 7 }} allowClear />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large">
                    提交
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: '100%' }} loading={loading}>
            <div className="summarize-top">
              <div className="summarize-title">上一篇总结</div>
              <div className="summarize-time">{moment().format('YYYY年MM月DD日')}</div>
            </div>

            <div className="summarize-question">今天我在哪些方面做得比较好?</div>
            <TextArea
              disabled
              placeholder="请输入内容"
              autoSize={{ minRows: 5, maxRows: 7 }}
              style={{ marginBottom: 24 }}
              value={data?.summarize_last?.summarize_one}
            />

            <div className="summarize-question">今天我在哪些方面可以做得更好?</div>
            <TextArea
              disabled
              placeholder="请输入内容"
              autoSize={{ minRows: 5, maxRows: 7 }}
              style={{ marginBottom: '24px' }}
              value={data?.summarize_last?.summarize_two}
            />

            <div className="summarize-comment">
              <div className="summarize-comment-title">评语:</div>
              <div className="summarize-comment-content">最近工作表现不错 继续加油！</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Summarize;
