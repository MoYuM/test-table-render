import React, { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { Button, DatePicker } from 'antd';

const {RangePicker} = DatePicker;

export const searchApi = async (params) => {
    return {
      data: [],
      total: 0,
    }
};

const schema = {
  type: 'object',
  labelWidth: 80,
  properties: {
    state: {
      title: '酒店状态',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '营业中', value: 'open' },
          { label: '已打烊', value: 'closed' },
        ],
      },
    },
    labels: {
      title: '酒店星级',
      type: 'string',
    },
    created_at: {
      title: '成立时间',
      type: 'range',
      widget: 'RangePicker'
    },
  },
};

export default function HomePage() {
const tableRef = useRef<TableContext>(null);

  const handleClick = () => {
    tableRef.current?.refresh();
  };

  const handleClick2 = () => {
    tableRef.current?.refresh({ stay: true });
  };

  const handleClick3 = () => {
    tableRef.current?.form.setValues({ pageId: 'xxx' });
  };

  return (
    <TableRender
      ref={tableRef}
      search={{
        schema,
        widgets: {
          RangePicker 
        },
      }}
      request={searchApi}
      columns={[]}
      pagination={{ pageSize: 2 }}
      toolbarRender={
        <>
          <Button onClick={handleClick}>刷新列表</Button>
          <Button onClick={handleClick2}>保持当前页刷新</Button>
          <Button onClick={handleClick3}>将url参数同步到查询条件里面</Button>
        </>
      }
    />
  );
}
