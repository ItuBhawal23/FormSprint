export type IFormField = {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  isChecked?: boolean;
  value: string | number | boolean | any;
  validate: (
    value: string | number | boolean | any,
    id?: string,
    // allFields?: Array<IFormField | ContainerFormField>
  ) => {
    isValid: boolean;
    errMsg: string;
  };
};

export type ContainerFormField = {
  fields: IFormField[];
};
