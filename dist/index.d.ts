declare type SenderAddress = number;
interface DeliveryInfoList {
    deliveryInfo: string[] | Object[];
    resourceURL: string;
}
interface OutboundSMSTextMessage {
    message: string;
}
declare type ReceiptRequest = {
    notifyURL: string;
    callbackData: string;
    senderName: string;
    resourceURL: string;
};
interface SmsMTRequest {
    address: string;
    message: string;
    clientCorrelator?: string;
}
interface SmsResponse {
    statusCode: number;
    description: string;
    isError: boolean;
}
interface SmsMTResponse extends SmsResponse {
    outboundSMSMessageRequest?: {
        address: string;
        deliveryInfoList: DeliveryInfoList;
        senderAddress: SenderAddress;
        outboundSMSTextMessage: OutboundSMSTextMessage;
        receiptRequest: ReceiptRequest;
    };
}
interface SmsMoInboundMessage {
    dateTime: string;
    destinationAddress: string;
    messageId: string;
    message: string;
    resourceURL: string;
    senderAddress: string;
}
interface SmsMO {
    inboundSMSMessageList: {
        inboundSMSMessage: SmsMoInboundMessage[];
    };
    numberOfMessagesInThisBatch: number;
    resourceURL: string;
    totalNumberOfPendingMessages: number;
}
export declare class SmsApi {
    private accessToken;
    private senderAddress;
    constructor(accessToken: string, senderAddress: number);
    sendSmsMt(smsMtRequest: SmsMTRequest): Promise<SmsMTResponse>;
    processMo(smsMo: any | string): Promise<SmsMO>;
}
export {};
