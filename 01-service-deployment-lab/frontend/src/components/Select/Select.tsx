import { Select } from "antd";
import type { Stato } from "../../types/types";

interface IOptionType {
  value: string;
  label: string;
}

interface ICustomSelect {
  options: IOptionType[];
  label: string;
  onChange: (value?: any, type?: string) => any;
  defaultVal?: number | string | Stato | any; 
  width ?: number 
}

const CustomSelect: React.FC<ICustomSelect> = ({
  options,
  onChange,
  label,
  defaultVal,
  width,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select
        defaultValue={defaultVal ?? options[0].value}
        options={options}
        onChange={(e) => onChange(e, "select")}
        style={{ width: width?? 250 }}
        getPopupContainer={(trigger) => trigger.parentElement!}
      />
    </div>
  );
};

export default CustomSelect;
