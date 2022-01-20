export enum HashEnum {
    'sha256',
    'md5',
  }
  
export type HashType = 'sha256' | 'md5'

export interface hashData {
  hashType: HashType;
  hash: string;
}

export interface FileMetaData {
  filename: string;
  size: number;
  mimetype: string;
  hashes: [hashData] | null;
}
