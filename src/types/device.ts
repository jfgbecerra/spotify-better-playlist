export interface Device {
  id: string;
  is_active: boolean;
  name: string;
  type: string;
}

export interface Devices {
  devices: Device[];
}
