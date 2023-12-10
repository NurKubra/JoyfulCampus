import { EncryptStorage } from 'encrypt-storage';

const key = process.env.REACT_APP_STORAGE_ENCRYPTION_KEY;

const encryptStorage = new EncryptStorage(key);  // ben bir key vercem ve tokeni o key ile sifrele 

export const setLocalStorage = (key, value) =>{
    encryptStorage.setItem(key, value);
}

export const getLocalStorage = (key) =>{
    return encryptStorage.getItem(key);  //localStorage deki daha once kaydedilmis key i getirmeyi saglar o yuzden return u var
}

export const removeLocalStorage = (key) =>{
    encryptStorage.removeItem(key);
} 