import { ClassifierModel } from "app/core/models/ClassifierModel";

export class MovementModel {
    descripcion: string;
    amount: number;
    accountId: string;
    typeMovement: string;
    date: Date;
    categoryMovement: ClassifierModel;
    nameCategory : String;
}



