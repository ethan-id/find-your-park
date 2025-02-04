import Image from 'next/image';
import { EyeSwitch } from './eye-switch';
import { Dispatch, FC, SetStateAction } from 'react';

interface LegendProps {
    setSeeParks: Dispatch<SetStateAction<boolean>>;
    setSeeCamps: Dispatch<SetStateAction<boolean>>;
}

export const Legend: FC<LegendProps> = ({setSeeParks, setSeeCamps}) => {
    return (
        <div className='flex flex-col bg-[#8fffe2] gap-2 text-black max-w-fit p-6 m-6 rounded-lg'>
            <p className='text-3xl font-semibold pb-2'>Legend</p>
            <div className='flex flex-row items-center text-lg gap-4'>
                <EyeSwitch setFunc={setSeeParks}/>
                <Image
                    src={'https://utfs.io/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV'}
                    alt={'Cat'}
                    width={30}
                    height={30}
                />
                {'National Parks'}
            </div>
            <div className='flex flex-row items-center text-lg gap-4'>
                <EyeSwitch setFunc={setSeeCamps}/>
                <Image
                    src={'https://utfs.io/f/vWKtdZl81f5UvjbDkE81f5URCm8dB0Y6kWywlsLzbPcIXEqZ'}
                    alt={'Cat'}
                    width={30}
                    height={30}
                />
                {'Campgrounds'}
            </div>
        </div>
    );
};
