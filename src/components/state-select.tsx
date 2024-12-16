import {Select, Selection, SelectItem} from '@nextui-org/react';
import {States} from '@/literals/states';
import {useState} from 'react';

export const StateSelect = () => {
    const [selectedState, setSelectedState] = useState<Selection>(new Set());

    return (
        <div className='relative pt-4 pl-4 min-w-[200px] flex flex-wrap gap-4'>
            <Select
                color={'primary'}
                size={'sm'}
                className='max-w-xs'
                label={'Select a State'}
                selectedKeys={selectedState}
                onSelectionChange={setSelectedState}
            >
                {States.map((state) => (
                    <SelectItem key={state.code}>{state.key}</SelectItem>
                ))}
            </Select>
        </div>
    );
};
