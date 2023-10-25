import { ClassifierModel } from "app/core/models/ClassifierModel";

export class MovementModel {
    descripcion: string;
    amount: number;
    accountId: string;
    typeMovement: number;
    date: Date;
    categoryMovement: ClassifierModel;
    nameCategory : String;
    id : string;
}



