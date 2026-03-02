import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import styles from './OptionSelect.module.css';

export interface SelectOptions {
    value : string;
    label : string;
} // 사용자가 보는 목록엔 label값을 보여주고 supabase에 저장할 땐 value같을 저장한다
  // 이유는 데이터 통일화?!

interface PaySelectProps { 
    value: string;
    options : SelectOptions[];
    placeholder: string;
    onSelect: (value: string) => void;
    isEditMode? : boolean;
}

export default function OptionSelect({value, options,placeholder, onSelect,isEditMode }: PaySelectProps) {
    // valuse = 영어 서비스명, 즉 supabase DB에 저장되는 값은 영어임
    return (
        <Select.Root value={value} onValueChange={onSelect} > 
            <Select.Trigger className={styles.SelectTrigger}disabled = {isEditMode} >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className={styles.SelectIcon}>
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className={styles.SelectContent} position="popper" sideOffset={5}>
                    <Select.Viewport className={styles.SelectViewport}>
                        {options.map((method) => (
                            <Select.Item
                                key={method.value}
                                value={method.value}
                                className={styles.SelectItem}
                            >
                                <Select.ItemText>{method.label}</Select.ItemText>
                                <Select.ItemIndicator className={styles.SelectItemIndicator}>
                                    <CheckIcon />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}