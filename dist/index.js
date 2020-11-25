"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsApi = void 0;
const axios_1 = require("axios");
const axiosConfig = {
    returnRejectedPromiseOnError: true,
    timeout: 30000,
    baseURL: 'https://devapi.globelabs.com.ph/smsmessaging/v1'
};
class SmsApi {
    constructor(accessToken, senderAddress) {
        this.accessToken = accessToken;
        this.senderAddress = senderAddress;
    }
    sendSmsMt(smsMtRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosClient = axios_1.default.create(axiosConfig);
            const response = yield axiosClient.request({
                method: 'POST',
                url: `/outbound/${this.senderAddress}/requests`,
                params: {
                    access_token: this.accessToken
                },
                responseType: 'json'
            });
            const smsMtResponse = Object.assign({
                statusCode: response.status,
                description: response.statusText,
                isError: response.status !== 201
            }, response.data);
            return smsMtResponse;
        });
    }
    processMo(smsMo) {
        return __awaiter(this, void 0, void 0, function* () {
            let smsMoObj = smsMo;
            if (typeof smsMo === 'string') {
                smsMo = JSON.parse(smsMo);
            }
            let inboundSmsMessages = [];
            if (smsMoObj.inboundSMSMessageList && Array.isArray(smsMoObj.inboundSMSMessageList.inboundSMSMessage)) {
                inboundSmsMessages = smsMoObj.inboundSMSMessageList.inboundSMSMessage;
            }
            const processedMo = {
                inboundSMSMessageList: {
                    inboundSMSMessage: inboundSmsMessages
                },
                numberOfMessagesInThisBatch: smsMoObj.numberOfMessagesInThisBatch,
                resourceURL: smsMoObj.resourceURL,
                totalNumberOfPendingMessages: smsMoObj.totalNumberOfPendingMessages
            };
            return new Promise(resolve => resolve(processedMo));
            ;
        });
    }
}
exports.SmsApi = SmsApi;
