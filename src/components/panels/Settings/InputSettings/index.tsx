import styles from "./inputsettings.module.scss";

interface ICustomInput {
  value   : number;
  setValue: any;
  min     : number;
  max     : number;
};

export const CustomInput = ({
  value,
  setValue,
  min,
  max
}: ICustomInput) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = parseInt(event.target.value, 10);

    if (inputValue < min) {
      inputValue = min;
    } else if (inputValue > max) {
      inputValue = max;
    }

    setValue(inputValue);
  };

  return (
    <input 
      className={styles.numberInput} 
      type="number" 
      defaultValue={6} 
      max={max} 
      min={min}
      onChange={handleInputChange}
      value={value}
    />
  )
};