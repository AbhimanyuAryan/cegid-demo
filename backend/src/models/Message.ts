import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  type: string;
  content: any;
  userId: mongoose.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
  type: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<IMessage>("Message", messageSchema);
