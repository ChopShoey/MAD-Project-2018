// Copied and modified from https://docs.nativescript.org/ns-framework-modules/trace

import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { messageType, TraceWriter } from "tns-core-modules/trace";

const array = new ObservableArray();

export class TimestampConsoleWriter implements TraceWriter {
    constructor() {
        // Not currently needed
    }

    write(message, category, type) {
        if (!console) {
            return;
        }

        const msgType = isUndefined(type) ? messageType.log : type;

        switch (msgType) {
            case messageType.log:
                array.push({
                    messageType: "log",
                    date: new Date().toISOString(),
                    message,
                    category
                });
                break;
            case messageType.info:
                array.push({
                    messageType: "info",
                    date: new Date().toISOString(),
                    message,
                    category
                });
                break;
            case messageType.warn:
                array.push({
                    messageType: "warning",
                    date: new Date().toISOString(),
                    message,
                    category
                });
                break;
            case messageType.error:
                array.push({
                    messageType: "error",
                    date: new Date().toISOString(),
                    message,
                    category
                });
                break;
            default:
                break;
        }
    }
}

function isUndefined(type: any): boolean {
    return type === undefined;
}
