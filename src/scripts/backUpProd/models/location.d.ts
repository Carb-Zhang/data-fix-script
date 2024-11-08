import { Document } from "mongoose";

export interface LocationSchema extends Document {
  type: string;
  coordinates: number [];
}
