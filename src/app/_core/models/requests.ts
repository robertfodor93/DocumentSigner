import { Document } from "./document";
import { Args } from "./args";

export class SignerRequest {
    options? : {
        redirectUrl?: string;
    }
    documents? : Document[] | any;
    args?: Args;
}