import * as mongoose from "mongoose";

export function objectToStringId(
  objectId?: mongoose.Types.ObjectId
): string | null {
  if (objectId) {
    return objectId.toHexString();
  } else {
    return null;
  }
}

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}
