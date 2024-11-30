/*
{
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin':'*'
  }
*/
import { browser } from '$app/environment';

const baseUri = 'http://localhost:5003/'
// const baseUri = 'http://gamer:5003'

const options = {
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export const getString = async (path: string) => {
    const url = `${baseUri}/${path}`;
    return await (await fetch(url)).text()
}

export const getJson = async (path: string) => {
    const url = `${baseUri}/${path}`;
    return await (await fetch(url)).json()
}

const api = {
    getString, getJson
};

export const postJson = async <T>(path: string, data: any): Promise<T> => {
    const url = `${baseUri}/${path}`;
    const myOptions = {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(data),
    };
    return <T>(await (await fetch(url, <any>myOptions)).json())
}

// console.log('browser:', browser)
// if (browser) {
//     (() => (window as any).s = Object.assign((window as any).s || {}, { api }))()
// }

export const getStatic = (path: string) => {
    return fetch(path).then(x => x.json())
}
