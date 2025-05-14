export type IFormField = {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  isChecked?: boolean;
  value: string | number | boolean | any;
  isValid: null | boolean;
  errorMsg: string;
  validate: (
    value: string | number | boolean | any,
    id?: string,
  ) => {
    isValid: boolean;
    errorMsg: string;
  };
};

export type ContainerFormField = {
  fields: IFormField[];
};
