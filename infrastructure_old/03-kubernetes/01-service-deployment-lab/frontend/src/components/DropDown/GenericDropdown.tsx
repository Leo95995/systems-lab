import React from "react";
import type { DropDownProps } from "antd";
import { Dropdown, Space } from "antd";
import type { IExportMenu } from "../../interfaces/interfaces";
import { LoadingOutlined } from "@ant-design/icons";


interface IDropDownComponent {
  items: IExportMenu[];
  placement?: DropDownProps["placement"];
  content: string;
  itemAction: (val: any) => void;
  isExporting: boolean
}

const GenericDropdown: React.FC<IDropDownComponent> = ({
  placement,
  content,
  items,
  itemAction,
  isExporting
}) => {


  return (
    <Space wrap>
      <Dropdown
        popupRender={() => (
          <div className="bg-white flex flex-col rounded-md border border-gray-200">
            {items?.map((item) => (
              <button
                className=" p-2 cursor-pointer hover:bg-gray-100 "
                disabled={isExporting}
                onClick={() => itemAction(item?.action)}
                key={item.key}
              >
                {isExporting ? <> Esportazione in corso <LoadingOutlined/></> :  item.label}
              </button>
            ))}
          </div>
        )}
        placement={placement ?? "bottomLeft"}
      >
        <button className="p-2 mt-4 rounded-md bg-blue-800 text-white cursor-pointer hover:bg-blue-900 hover:text-white">
          {content}
        </button>
      </Dropdown>
    </Space>
  );
};

export default GenericDropdown;
