import axios from 'axios';

type AccessToken = string;
type SenderAddress = number;

interface DeliveryInfoList {
    deliveryInfo: string[]|Object[],
    resourceURL: string
}

interface OutboundSMSTextMessage {
    message: string
}

type ReceiptRequest = {
    notifyURL: string,
    callbackData: string,
    senderName: string,
    resourceURL: string
}

interface SmsMTRequest {
    address: string,
    message: string,
    clientCorrelator?: string
}

interface SmsResponse {
    statusCode: number,
    description: string,
    isError: boolean
}

interface SmsMTResponse extends SmsResponse {
    outboundSMSMessageRequest?: {
        address: string,
        deliveryInfoList: DeliveryInfoList,
        senderAddress: SenderAddress,
        outboundSMSTextMessage: OutboundSMSTextMessage,
        receiptRequest: ReceiptRequest
    }
}

interface SmsMoInboundMessage {
    dateTime: string,
    destinationAddress: string,
    messageId: string,
    message: string,
    resourceURL: string,
    senderAddress: string
}

interface SmsMO {
    inboundSMSMessageList: {
        inboundSMSMessage: SmsMoInboundMessage[]
    },
    numberOfMessagesInThisBatch: number,
    resourceURL: string,
    totalNumberOfPendingMessages: number
}

const axiosConfig = {
    returnRejectedPromiseOnError: true,
    timeout: 30000,
    baseURL: 'https://devapi.globelabs.com.ph/smsmessaging/v1'
}

export class SmsApi {

    private accessToken: AccessToken;
    private senderAddress: SenderAddress;

    constructor(accessToken: string, senderAddress: number) {
        this.accessToken = accessToken;
        this.senderAddress = senderAddress;
    }

    async sendSmsMt(smsMtRequest: SmsMTRequest): Promise<SmsMTResponse> {

        const axiosClient = axios.create(axiosConfig);

        const response = await axiosClient.request({
            method: 'POST',
            url: `/outbound/${this.senderAddress}/requests`,
            params: {
                access_token: this.accessToken
            },
            responseType: 'json'
        });

        const smsMtResponse: SmsMTResponse = Object.assign({
            statusCode: response.status,
            description: response.statusText,
            isError: response.status !== 201
        }, response.data);

        return smsMtResponse;
    }

    async processMo(smsMo: any|string): Promise<SmsMO> {

        let smsMoObj: any = smsMo;
        if (typeof smsMo === 'string') {
            smsMo = JSON.parse(smsMo);
        }

        let inboundSmsMessages: Array<any> = [];
        if (smsMoObj.inboundSMSMessageList && Array.isArray(smsMoObj.inboundSMSMessageList.inboundSMSMessage)) {
            inboundSmsMessages = smsMoObj.inboundSMSMessageList.inboundSMSMessage;
        }

        const processedMo: SmsMO = {
            inboundSMSMessageList: {
                inboundSMSMessage: inboundSmsMessages
            },
            numberOfMessagesInThisBatch: smsMoObj.numberOfMessagesInThisBatch,
            resourceURL: smsMoObj.resourceURL,
            totalNumberOfPendingMessages: smsMoObj.totalNumberOfPendingMessages
        }

        return new Promise(resolve => resolve(processedMo));;
    }
}
