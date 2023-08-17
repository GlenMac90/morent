import * as mongoose from 'mongoose';

export function objectToStringId(
  objectId?: mongoose.Types.ObjectId
): string | null {
  if (objectId) {
    return objectId.toHexString();
  } else {
    return null;
  }
}
