import * as codec from "@ipld/dag-cbor";
import { encode } from "multiformats/block";
import { sha256 as hasher } from "multiformats/hashes/sha2";


export const getCid = async (obj) => {
    const block = await encode({ value: obj, codec, hasher });
    const cid = block.cid;
    return cid;
}

export const getCidString = async (obj) => {
    const cid = await getCid(obj);
    return cid.toString();
}