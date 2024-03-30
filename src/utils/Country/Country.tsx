import { AutoComplete, FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";
import { ReactNode, useEffect, useState } from "react";
import countryJson from "../../assets/json/country.json";

type Option = {
  value: string;
  label: ReactNode;
};

type Props = {
  form: FormInstance;
  fieldKey: string;
  fieldValue?: string;
};

// const COUNTRY_URL = "https://country-code-au6g.vercel.app/";
// /* <Image src={COUNTRY_URL + country.image} preview={false} height={20} width={20} />{" "} */

export default function Country({ form, fieldKey }: Readonly<Props>) {
  const [options, setOptions] = useState<Option[]>([]);
  const contryValue = useWatch(fieldKey, form);

  useEffect(() => {
    const countryOptions = countryJson.map((country) => {
      return {
        value: country.name,
        label: (
          <div>
            {country?.emoji} {country.name}
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
      onChange={(value) => form.setFieldsValue({ [fieldKey]: value })}
      value={contryValue}
    />
  );
}
