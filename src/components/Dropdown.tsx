import { Listbox } from '@headlessui/react';

interface props {
    val: number;
    setVal: (val: number) => void;
    options: number[] | string[];
}

export default function Dropdown(props: props) {
    const { val, setVal, options } = props;

    return (
        <div>
            <Listbox value={val} onChange={setVal}>
                <Listbox.Button>{options[val]}</Listbox.Button>
                <Listbox.Options>
                    {options.map((option, i) => (
                        <Listbox.Option key={i} value={i} className="">
                            {option}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
