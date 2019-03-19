// Copied and modified from https://docs.nativescript.org/ns-framework-modules/trace

import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import * as trace from "tns-core-modules/trace";

const array = new ObservableArray();

export class TimestampConsoleWriter implements trace.TraceWriter {
    constructor() {
        // Not currently needed
    }

    write(message, category, type) {
        // console.log(`Writing ${message} to the log`);
        if (!console) {
            return;
        }

        const msgType = isUndefined(type) ? trace.messageType.log : type;
        let msgTypeString: string
        switch (msgType) {
            case trace.messageType.log:
                msgTypeString = "LOG";
                break;
            case trace.messageType.info:
                msgTypeString = "INFO";
                break;
            case trace.messageType.warn:
                msgTypeString = "WARN";
                break;
            case trace.messageType.error:
                msgTypeString = "ERROR";
                break;
            default:
                break;
        }
        console.log(`${category} ${msgTypeString} ${new Date().toISOString()}: ${message}`);
    }
}

function isUndefined(type: any): boolean {
    return type === undefined;
}
