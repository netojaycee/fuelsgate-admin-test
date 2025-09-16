
export type DepotHubType = 'tanker' | 'others';

export interface DepotHubDto {
  _id: string;
  name: string;
  depots: string[];
  type: DepotHubType;
}


export interface CreateDepotHubDto {
  name: string;
  depots: string[];
  type: DepotHubType;
}

export interface UpdateDepotHubDto extends Partial<CreateDepotHubDto> { }