export interface IEmployee {
  Id: number;
  Name: string;
  Email: string;
  Phone: string;
  JobTitle: string;
  Gender: number;
  DepartmentId: number;
  JoiningDate: string;
  DateTime: string;
  DateOnly: string;
}

export enum Gender{
    male = 1,
    female = 2
}