import { AutoComplete, FormInstance, Image } from "antd";
import { ReactNode, useEffect, useState } from "react";
import countryJson from "../../assets/json/country.json";

type Option = {
  value: string;
  label: ReactNode;
};

type Props = {
  form: FormInstance;
  fieldKey: string;
};

export default function Country({ form, fieldKey }: Readonly<Props>) {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const countryOptions = countryJson.map((country) => {
      return {
        value: country.name,
        label: (
          <div>
            <Image src={country.image} preview={false} height={20} width={20} /> {country.name}
          </div>
        ),
      };
    });

    setOptions(countryOptions);
  }, []);

  const onSelect = (value: string) => {
    form.setFieldsValue({ [fieldKey]: value });
  };

  return (
    <AutoComplete
      defaultActiveFirstOption
      options={options}
      placeholder="Location (Country)"
      filterOption={(inputValue, option) => {
        const isOptionsAvailable =
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
        return isOptionsAvailable;
      }}
      onSelect={onSelect}
      onSearch={(value) => form.setFieldsValue({ [fieldKey]: value })}
    />
  );
}
