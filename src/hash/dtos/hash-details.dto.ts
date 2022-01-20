import {IsEnum, IsUUID} from 'class-validator'

enum HashType{
    'sha256',
    'md5'
}

export class HashDetailsDto{
    @IsUUID('4')
    fileId: string;

    @IsEnum(HashType)
    hashType: string
}