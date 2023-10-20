import { ClassifierModel } from "app/core/models/ClassifierModel";

export class AccountModel {
    id : string;
    name: string;
    salary: number;
    categoryAccount: ClassifierModel;
    nameCategory: string;

}
