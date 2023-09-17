import { Listbox } from '@headlessui/react';

interface props {
    val: number;
    setVal: (val: number) => void;
    options: number[] | string[];
    prefix: string;
}

export default function Dropdown(props: props) {
    const { val, setVal, options, prefix } = props;

    return (
        <div>
            <Listbox value={val} onChange={setVal}>
                <Listbox.Button className="w-32 cursor-pointer border border-inactive bg-bg2 p-2 font-bold text-active shadow-drop">
                    {prefix + options[val]}
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-2 max-h-36 w-32 overflow-y-auto bg-bg2 shadow-drop">
                    {options.map((option, i) => (
                        <Listbox.Option key={i} value={i} className="cursor-pointer rounded-none p-2 text-inactive hover:bg-bg3">
                            {prefix + option}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
