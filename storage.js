import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const KEY='keepsake.user-data.v1';
const store=Platform.OS==='web' ? {
  getItem:async key=>typeof localStorage==='undefined'?null:localStorage.getItem(key),
  setItem:async (key,value)=>{if(typeof localStorage!=='undefined')localStorage.setItem(key,value)},
} : AsyncStorage;

export async function loadUserData(){
  try {const raw=await store.getItem(KEY);return raw?JSON.parse(raw):null}
  catch(error){console.warn('Could not load saved data',error);return null}
}
export async function saveUserData(data){
  try {await store.setItem(KEY,JSON.stringify(data));return true}
  catch(error){console.warn('Could not persist saved data',error);return false}
}
