import { FC } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';

const AuthorSelect: FC = () => {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='light'>Light</SelectItem>
                <SelectItem value='dark'>Dark</SelectItem>
                <SelectItem value='system'>System</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default AuthorSelect;