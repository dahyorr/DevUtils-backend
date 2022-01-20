import {IsEnum, IsUUID} from 'class-validator'
import { HashEnum, HashType } from 'src/types';

export class HashDetailsDto{
    @IsUUID('4')
    fileId: string;

    @IsEnum(HashEnum)
    hashType: HashType
}