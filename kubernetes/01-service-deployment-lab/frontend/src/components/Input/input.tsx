import { Input, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Stato } from "../../types/types";
const { TextArea } = Input;
interface ITaskInput {
  id?: string;
  name: string;
  label: string;
  type: string;
  onChange?: (value?: any, type?: string) => any;
  placeholder?: string;
  width?: string;
  heigth?: string;
  defaultValue?: number | string | Date | Stato | any;
}

const TaskInput: React.FC<ITaskInput> = ({
  id,
  name,
  label,
  type,
  placeholder,
  onChange,
  width,
  heigth,
  defaultValue,
}) => {
  if (type === "text") {
    return (
      <div
        className="flex flex-col gap-2"
        style={{ width: width ?? "250px", height: heigth }}
      >
        <label htmlFor={name}>{label}</label>
        <Input
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue ?? ""}
          name={name}
          id={id ?? name}
          className="border border-gray-400 rounded-md h-8"
        ></Input>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div
        className="flex flex-col gap-2"
        style={{ width: width ?? "250px", height: heigth }}
      >
        <label htmlFor={name}>{label}</label>
        <DatePicker
          onChange={onChange as any}
          placeholder={placeholder}
          name={name}
          id={id ?? name}
          defaultValue={dayjs(defaultValue)}
          getPopupContainer={(trigger) => trigger.parentElement!}
          className="border border-gray-400 rounded-md h-8"
        ></DatePicker>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div
        className="flex flex-col gap-2"
        style={{ width: width ?? "250px", height: heigth }}
      >
        <label htmlFor={name}>{label}</label>
        <TextArea
          onChange={onChange}
          defaultValue={defaultValue ?? ''}
          placeholder={placeholder}
          name={name}
          rows={5}
          id={id ?? name}
          className="border border-gray-400 rounded-md h-8"
        ></TextArea>
      </div>
    );
  }
};

export default TaskInput;
