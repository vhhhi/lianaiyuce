import React from 'react';
import { Card, Button, Space, Tooltip, Modal } from 'antd';
import { 
  DownloadOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { ActionPanelProps } from './types';
import styles from './styles.module.css';

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onDownload,
  onShare,
  onPrint,
  loading = false
}) => {
  // 处理下载PDF
  const handleDownload = () => {
    Modal.confirm({
      title: '下载PDF报告',
      content: '确认下载完整版PDF测评报告吗？',
      onOk: () => {
        onDownload?.();
      }
    });
  };

  // 处理分享
  const handleShare = () => {
    Modal.confirm({
      title: '分享报告',
      content: '确认生成分享链接吗？链接有效期为7天。',
      onOk: () => {
        onShare?.();
      }
    });
  };

  // 处理打印
  const handlePrint = () => {
    Modal.confirm({
      title: '打印报告',
      content: '确认打印测评报告吗？',
      onOk: () => {
        onPrint?.();
      }
    });
  };

  return (
    <Card className={styles.container}>
      <Space size="middle">
        <Tooltip title="下载PDF版报告">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            loading={loading}
          >
            下载报告
          </Button>
        </Tooltip>

        <Tooltip title="生成分享链接">
          <Button
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            loading={loading}
          >
            分享
          </Button>
        </Tooltip>

        <Tooltip title="打印报告">
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            loading={loading}
          >
            打印
          </Button>
        </Tooltip>

        <Tooltip title="查看报告说明">
          <Button
            type="link"
            icon={<QuestionCircleOutlined />}
            onClick={() => Modal.info({
              title: '报告说明',
              content: (
                <div>
                  <p>1. 报告基于您的测评结果生成</p>
                  <p>2. 建议仅供参考,请结合实际情况使用</p>
                  <p>3. 如有疑问,请咨询专业人士</p>
                </div>
              )
            })}
          >
            报告说明
          </Button>
        </Tooltip>
      </Space>
    </Card>
  );
};
