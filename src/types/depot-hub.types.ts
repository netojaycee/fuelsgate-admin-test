export interface DepotHubDto {
  _id: string
  name: string
  depots: string[]
}

export interface CreateDepotHubDto {
  name: string
  depots: string[]
}

export interface UpdateDepotHubDto extends Partial<CreateDepotHubDto> { }