export enum HashEnum {
    'sha256',
    'md5',
  }
  
export type HashType = 'sha256' | 'md5'
export type StatusType = "Pending" | "Failed" | "Completed"

export interface HashData {
  hashType: HashType;
  hash: string;
  status: StatusType;
}

export interface FileMetaData {
  filename: string;
  size: number;
  mimetype: string;
  hashes: HashData[] | null;
}
