import axios from "axios";

export const HttpMethod = {
  POST: 'post',
  GET: 'get'
}

const sendRequest = async (requestURL, method = "get", data, requestType = "json", loading) => {
  // if (loading) {
  //   store.dispatch({
  //     type: Action.ACTION_LOADING
  //   });
  // }

  return await axios({
    method: method,
    url: requestURL,
    responseType: requestType,
    data: data,
    // headers: { "Access-Control-Allow-Origin": "*" }
  }).then(res => {
    return res;
  }).catch(res => {
    // Unhandled error.   
  }).finally(() => {
    // Finally
  });
}

export const httpGet = async (url, reqData, reqType = "json", loading = true) =>
  await sendRequest(url, HttpMethod.GET, reqData, reqType, loading);

export const httpPost = async (url, reqData, reqType = "json", loading = true) =>
  await sendRequest(url, HttpMethod.POST, reqData, reqType, loading);